package com.cmpe275.DirectExchange.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.CounterOffer;
import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Helper.TransactionDTODeep;
import com.cmpe275.DirectExchange.Repository.CounterOfferRepository;
import com.cmpe275.DirectExchange.Repository.OfferRepository;
import com.cmpe275.DirectExchange.Repository.TransactionRepository;

@Service
public class TransactionService {
	
	@Autowired
	TransactionRepository transactionRepository;
	
	@Autowired
	CounterOfferRepository counterOfferRepository;
	
	@Autowired
	OfferRepository offerRepository;
	
	@Autowired
	EmailVerificationService emailVerificationService;
	
	@Autowired
	TransactionUserMapService transactionUserMapService;
	
	@Autowired
    ModelMapper modelMapper;
	
	@Value("${spring.mail.username}")
	private String email;
	
	@Transactional
	public String acceptOffer(Long offerId1, Long offerId2, Long offerId3) {
		
		Long currentRequestId = transactionRepository.max();
		if(currentRequestId==null)
			currentRequestId=Long.valueOf(1);
		
		Long requestID = currentRequestId+1;
					
		Offer offer1 = offerRepository.findById(offerId1).orElse(null);
		offer1.setOfferStatus("inTransaction");
		offerRepository.save(offer1);
		
		Transaction transaction1 = new Transaction(requestID, offer1.getOfferId(), offer1.getUser().getId(), "Pending");
		transactionRepository.save(transaction1);
		sendTransactionInitiationEmail(offer1.getUser().getUserName(), offerId1);
		
		Offer offer2 = offerRepository.findById(offerId2).orElse(null);
		offer2.setOfferStatus("inTransaction");
		offerRepository.save(offer2);
		
		Transaction transaction2 = new Transaction(requestID, offer2.getOfferId(), offer2.getUser().getId(), "Pending");
		transactionRepository.save(transaction2);
		sendTransactionInitiationEmail(offer2.getUser().getUserName(), offerId2);
		
		transactionUserMapService.addMapping(transaction1, offer2.getUser());
		transactionUserMapService.addMapping(transaction2, offer1.getUser());
		
		Offer offer3;
		Transaction transaction3;
		if(offerId3 != null) {
			offer3 = offerRepository.findById(offerId3).orElse(null);
			offer3.setOfferStatus("inTransaction");
			offerRepository.save(offer3);
			
			transaction3 = new Transaction(requestID, offer3.getOfferId(), offer3.getUser().getId(), "Pending");
			transactionRepository.save(transaction3);
			sendTransactionInitiationEmail(offer3.getUser().getUserName(), offerId3);
			
			transactionUserMapService.addMapping(transaction1, offer3.getUser());
			transactionUserMapService.addMapping(transaction3, offer1.getUser());
		}
			
		return "Transaction initiated";
	}
	
//	public String acceptOffer(Long offerId1, Integer splitIndicator1, Long offerId2, Integer splitIndicator2, 
//			Long offerId3, Integer splitIndicator3) {
//		if(splitIndicator1==0 && splitIndicator2==0)
//			return processOfferTransactions(offerId1, offerId2, offerId3);
//		
//		Long source;
//		Long match1;
//		Long match2;
//		
//		if(splitIndicator1==1) {
//			match1=offerId1;
//			if(splitIndicator2==1) {
//				match2=offerId2;
//				source=offerId3;
//			} else {
//				source=offerId2;
//				match2=offerId3;
//			}
//		} else {
//			source=offerId1;
//			match1=offerId2;
//			match2=offerId3;
//		}
//		return processOfferTransactions(source, match1, match2);
//	}
	
	@Transactional
	public String sendMoney(Long offerId) {
		Offer offer = offerRepository.findById(offerId).orElse(null);
		Transaction transaction = transactionRepository.findByOfferID(offerId);
		transaction.setReceivedAmount(offer.getSourceAmount());
		transaction.setSourceCurrency(offer.getSourceCurrency());
		transaction.setTransactionStatus("Received");
		transactionRepository.save(transaction);
		sendMoneyReceivedEmail(offer.getUser().getUserName(), transaction);
		
		List<Transaction> transactions = transactionRepository.findByRequestID(transaction.getRequestID());
		boolean allReceived=true;
		for(Transaction t : transactions) {
			if(!t.getTransactionStatus().equals("Received")) {
				allReceived=false;
				break;
			}
		}
		
		if(allReceived) {
			for(Transaction t : transactions) {
				Offer o = offerRepository.findById(t.getOfferID()).orElse(null);
				
				t.setTransferredAmount(calculateTransferredAmount(o));
				t.setDestinationCurrency(o.getDestinationCurrency());
				t.setTransactionStatus("Completed");
				transactionRepository.save(t);
				sendTransactionCompletionEmail(o.getUser().getUserName(), t);
				
				o.setOfferStatus("fulfilled");
				offerRepository.save(o);
			}
		}
		
		return "Money received by DirectExchange";
	}
	
	@Transactional
	public String acceptCounterOffer(Long offerId, Long id) {
		CounterOffer counterOffer = counterOfferRepository.findById(id).orElse(null);
		Offer offer = offerRepository.findById(offerId).orElse(null);
		
		offer.setSourceAmount(counterOffer.getCounterProposedAmount());
		offerRepository.save(offer);
		
		acceptOffer(counterOffer.getSourceOfferID(), counterOffer.getSplit1OfferID(), counterOffer.getSplit2OfferID());
		
		counterOffer.setAccepted(1);
		counterOfferRepository.save(counterOffer);
		
		return "Transaction initiated";
	}
	
	private void sendTransactionInitiationEmail(String sendTo, Long offerId) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(sendTo);
		mailMessage.setSubject("Complete Transaction!");
		mailMessage.setFrom(email);
		mailMessage.setText("Your transaction for the offer ID " + offerId + " has been initiated, please send "
				+ "the funds to DirectExchange in order to complete your transaction ");
				
		try {
			emailVerificationService.sendEmail(mailMessage);
		} catch (Exception exception) {
			
		}
	}
	
	private void sendMoneyReceivedEmail(String sendTo, Transaction transaction) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(sendTo);
		mailMessage.setSubject("Received Funds!");
		mailMessage.setFrom(email);
		mailMessage.setText("DirectExchange has received "+ transaction.getReceivedAmount() + " " + transaction.getSourceCurrency() + 
				" for the offer ID " + transaction.getOfferID() +
				". We will notify you once the transaction is completed.");
				
		try {
			emailVerificationService.sendEmail(mailMessage);
		} catch (Exception exception) {
			
		}
	}
	
	private void sendTransactionCompletionEmail(String sendTo, Transaction transaction) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(sendTo);
		mailMessage.setSubject("Transaction Completed!");
		mailMessage.setFrom(email);
		mailMessage.setText("DirectExchange has transferred " + transaction.getTransferredAmount() + " " + transaction.getDestinationCurrency() +
				" to your account for the offer ID " + transaction.getOfferID() + " and your offer has been fulfilled.");	
		try {
			emailVerificationService.sendEmail(mailMessage);
		} catch (Exception exception) {
			
		}
	}
	
	private Double calculateTransferredAmount(Offer offer) {
		return (offer.getDestinationAmount()-offer.getServiceFee());
	}
	
	public List<TransactionDTODeep> getMyTransactions(Long userId){
		List<Transaction> transactions = transactionRepository.findByUserID(userId);
		List<TransactionDTODeep> myTransactionHistory = new ArrayList<TransactionDTODeep>();
		for(Transaction transaction : transactions) {
			myTransactionHistory.add(convertToSTransactionDTODeep(transaction));
		}
		return myTransactionHistory;
	}
	
	private TransactionDTODeep convertToSTransactionDTODeep(Transaction transaction) {
    	this.modelMapper.typeMap(Transaction.class, TransactionDTODeep.class).addMapping(Transaction::getReceivingParties, TransactionDTODeep::setReceivingParties);
    	TransactionDTODeep transactionDTODeep = modelMapper.map(transaction, TransactionDTODeep.class);
    	return transactionDTODeep;
    }

}

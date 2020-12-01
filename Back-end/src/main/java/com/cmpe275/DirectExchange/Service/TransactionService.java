package com.cmpe275.DirectExchange.Service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Repository.OfferRepository;
import com.cmpe275.DirectExchange.Repository.TransactionRepository;

@Service
public class TransactionService {
	
	@Autowired
	TransactionRepository transactionRepository;
	
	@Autowired
	OfferRepository offerRepository;
	
	@Autowired
	EmailVerificationService emailVerificationService;
	
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
		
		Transaction transaction1 = new Transaction(requestID, offer1.getOfferId(), "Pending");
		transactionRepository.save(transaction1);
		sendTransactionInitiationEmail(offer1.getUser().getUserName(), offerId1);
		
		Offer offer2 = offerRepository.findById(offerId2).orElse(null);
		offer2.setOfferStatus("inTransaction");
		offerRepository.save(offer2);
		
		Transaction transaction2 = new Transaction(requestID, offer2.getOfferId(), "Pending");
		transactionRepository.save(transaction2);
		sendTransactionInitiationEmail(offer2.getUser().getUserName(), offerId2);
		
		Offer offer3;
		if(offerId3 != null) {
			offer3 = offerRepository.findById(offerId3).orElse(null);
			offer3.setOfferStatus("inTransaction");
			offerRepository.save(offer3);
			
			Transaction transaction3 = new Transaction(requestID, offer3.getOfferId(), "Pending");
			transactionRepository.save(transaction3);
			sendTransactionInitiationEmail(offer3.getUser().getUserName(), offerId3);
		}
			
		return "Transaction initiated";
	}
	
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
				t.setDestinationCurrency(offer.getDestinationCurrency());
				t.setTransactionStatus("Completed");
				transactionRepository.save(t);
				sendTransactionCompletionEmail(o.getUser().getUserName(), t);
				
				o.setOfferStatus("fulfilled");
				offerRepository.save(o);
			}
		}
		
		return "Money received by DirectExchange";
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

}

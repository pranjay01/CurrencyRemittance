package com.cmpe275.DirectExchange.Service;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Helper.OfferDTODeep;
import com.cmpe275.DirectExchange.Helper.UserDTODeep;
import com.cmpe275.DirectExchange.Repository.OfferRepository;
import com.cmpe275.DirectExchange.Repository.TransactionRepository;
import com.cmpe275.DirectExchange.Repository.UserRepository;

@Service
public class OfferService {
	
	@Autowired
	OfferRepository offerRepository;
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	TransactionRepository transactionRepository;
	
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	
	public Offer getOfferDetails(Long offerId) {
		return offerRepository.findById(offerId).orElse(null);
	}
	
	@Transactional
	public Offer createOffer(Long userId, String sourceCountry, String sourceCurrency, Double sourceAmount, 
			String destinationCountry, String destinationCurrency, Double exchangeRate, String expirationDate,
			Integer allowCounterOffers, Integer splitExchange) {
		
		User user = userRepository.findById(userId).orElse(null);
		Offer offer = new Offer(user, sourceCountry, sourceCurrency, sourceAmount, destinationCountry, 
				destinationCurrency, exchangeRate, parseDate(expirationDate), allowCounterOffers, splitExchange, "open");
		return offerRepository.save(offer);
	}
	
	@Transactional
	public Offer updateOfferDetails(Long offerId, Double sourceAmount, Double exchangeRate, Integer allowCounterOffers, Integer splitExchange) {
		Offer offer = offerRepository.findById(offerId).orElse(null);
		if(sourceAmount != null)
			offer.setSourceAmount(sourceAmount);
		if(exchangeRate != null)
			offer.setExchangeRate(exchangeRate);
		if(allowCounterOffers != null)
			offer.setAllowCounterOffers(allowCounterOffers);
		if(splitExchange != null)
			offer.setSplitExchange(splitExchange);
		
		return offerRepository.save(offer);
	}
	
	private java.sql.Date parseDate(String date) {
	    try {
	        return new Date(DATE_FORMAT.parse(date).getTime());
	    } catch (ParseException e) {
	        throw new IllegalArgumentException(e);
	    }
	}
	
	public List<Offer> getMyOffers(Long userId) {
		List<Offer> myOffers = new ArrayList<Offer>();
		
		User user = userRepository.findById(userId).orElse(null);
		myOffers.addAll(offerRepository.findByUserAndOfferStatus(user, "open"));
		myOffers.addAll(offerRepository.findByUserAndOfferStatusNot(user, "open"));
		
		return myOffers;
	}
	
	public List<OfferDTODeep> searchOffers(String sourceCurrency, Double sourceAmount, String destinationCurrency, Double destinationAmount) {
		List<Offer> offers = new ArrayList<Offer>();
		
		offers.addAll(offerRepository.findBySourceCurrencyAndSourceAmountAndDestinationCurrencyAndDestinationAmountAndOfferStatus(
				sourceCurrency, sourceAmount, destinationCurrency, destinationAmount, "open"));
		List<OfferDTODeep> offerDTO = new ArrayList<OfferDTODeep>();
		for(int i = 0 ; i < offers.size(); i++) {
			Offer offer = offers.get(i);
			Long userID = offer.getUser().getId();
			User user = userRepository.getOne(userID);
			Double rating = calculateRating(user.getId());
			UserDTODeep userDTODeep = new UserDTODeep(user.getId(), user.getUserName(), user.getNickname(), user.getStatus(), rating.toString());
			OfferDTODeep o = new OfferDTODeep(offer.getOfferId(), userDTODeep, offer.getSourceCountry() , offer.getSourceCurrency() , offer.getSourceAmount(), offer.getDestinationCountry(), offer.getDestinationCurrency(), offer.getDestinationAmount(), offer.getExchangeRate() , offer.getExpirationDate(), offer.getAllowCounterOffers(), offer.getSplitExchange() , offer.getOfferStatus(), offer.getServiceFee(), offer.getMinAmount(), offer.getMaxAmount());
			offerDTO.add(o);
		}
		return offerDTO;
	}

	public double calculateRating(long userID) {
		List<Transaction> transaction =  transactionRepository.findByUserID(userID);
		int faultCount = 0;
		double rating = 0;
		if(transaction.size() != 0) {
			for(Transaction t: transaction) {
				if(t.getTransactionStatus().compareTo("at-fault") == 0) {
					faultCount++;
				}
			}
			rating =  ((1- (faultCount) / (transaction.size())) * 4) + 1;
		}
		return rating;
	}

}

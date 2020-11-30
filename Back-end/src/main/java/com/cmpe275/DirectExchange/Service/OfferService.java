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
import com.cmpe275.DirectExchange.Repository.OfferRepository;

@Service
public class OfferService {
	
	@Autowired
	OfferRepository offerRepository;
	
	private final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	
	@Transactional
	public Offer createOffer(Long userId, String sourceCountry, String sourceCurrency, Double sourceAmount, 
			String destinationCountry, String destinationCurrency, Double exchangeRate, String expirationDate,
			Integer allowCounterOffers, Integer splitExchange) {
		
		Offer offer = new Offer(userId, sourceCountry, sourceCurrency, sourceAmount, destinationCountry, 
				destinationCurrency, exchangeRate, parseDate(expirationDate), allowCounterOffers, splitExchange, "open");
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
		myOffers.addAll(offerRepository.findByUserIdAndOfferStatus(userId, "open"));
		myOffers.addAll(offerRepository.findByUserIdAndOfferStatusNot(userId, "open"));
		
		return myOffers;
	}

}

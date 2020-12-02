package com.cmpe275.DirectExchange.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.cmpe275.DirectExchange.Entity.CounterOffer;
import com.cmpe275.DirectExchange.Repository.CounterOfferRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CounterOfferService {

    @Autowired
    CounterOfferRepository counterOfferRepository;

    @Transactional
	public Long createCounterOffer(Long offerID, double counterProposedAmount, Long userID) {
		CounterOffer offer = new CounterOffer(offerID, counterProposedAmount, 0, userID);
        CounterOffer resultObj =  counterOfferRepository.save(offer);
        return resultObj.getID();
    }

    public List<CounterOffer> searchCounterOffers(Long offerID) {
		List<CounterOffer> counterOffers = new ArrayList<CounterOffer>();
		
		counterOffers.addAll(counterOfferRepository.findByOfferID(offerID));
		
		return counterOffers;
	}
    
}

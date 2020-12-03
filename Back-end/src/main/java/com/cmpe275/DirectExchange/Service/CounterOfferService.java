package com.cmpe275.DirectExchange.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.cmpe275.DirectExchange.Entity.CounterOffer;
import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Repository.CounterOfferRepository;
import com.cmpe275.DirectExchange.Repository.OfferRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CounterOfferService {

    @Autowired
    CounterOfferRepository counterOfferRepository;

    @Autowired
    OfferRepository offerRepository;

    @Transactional
	public Long createCounterOffer(Long offerID1, double counterProposedAmount, Long userID, Long offerID2) {
		CounterOffer counterOffer = new CounterOffer(offerID1, counterProposedAmount, 0, userID);
        CounterOffer resultObj =  counterOfferRepository.save(counterOffer);

        Offer offer = offerRepository.findById(offerID2).orElse(null);
		offer.setOfferStatus("counterMade");
		offerRepository.save(offer);
        return resultObj.getID();
    }

    public List<CounterOffer> searchCounterOffers(Long offerID) {
		List<CounterOffer> counterOffers = new ArrayList<CounterOffer>();
		
		counterOffers.addAll(counterOfferRepository.findByOfferID(offerID));
		
		return counterOffers;
	}
    
}

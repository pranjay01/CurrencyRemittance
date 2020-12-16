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
	public Long createCounterOffer(Long proposedOnOfferID, double counterProposedAmount, Long userID, Long counterOfferID,
			Long sourceOfferID, Long split1OfferID, Long split2OfferID) {
    	
    	if(sourceOfferID==null)
    		sourceOfferID=proposedOnOfferID;
    	if(split1OfferID==null)
    		split1OfferID=counterOfferID;
    	
		CounterOffer counterOffer = new CounterOffer(proposedOnOfferID, counterProposedAmount, 0, userID, 
				counterOfferID, sourceOfferID, split1OfferID, split2OfferID);
        counterOfferRepository.save(counterOffer);

        Offer offer = offerRepository.findById(counterOfferID).orElse(null);
		offer.setOfferStatus("counterMade");
		offerRepository.save(offer);
        return counterOffer.getID();
    }

    public List<CounterOffer> searchCounterOffers(Long offerID) {
		List<CounterOffer> counterOffers = new ArrayList<CounterOffer>();
		
		counterOffers.addAll(counterOfferRepository.findAllByProposedOnOfferID(offerID));
		
		return counterOffers;
	}
    
}

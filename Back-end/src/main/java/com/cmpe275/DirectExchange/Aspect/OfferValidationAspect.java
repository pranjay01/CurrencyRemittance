package com.cmpe275.DirectExchange.Aspect;

import java.util.List;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;

import com.cmpe275.DirectExchange.Entity.CounterOffer;
import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Helper.OfferValidationException;
import com.cmpe275.DirectExchange.Repository.CounterOfferRepository;
import com.cmpe275.DirectExchange.Repository.OfferRepository;

@Aspect
@Order(0)
public class OfferValidationAspect {
	
	@Autowired
	OfferRepository offerRepository;
	
	@Autowired
	CounterOfferRepository counterOfferRepository;
	
	@Before("execution(public * com.cmpe275.DirectExchange.Service.OfferService.updateOfferDetails(..))")
	public void checkOfferStatusBeforeUpdate(JoinPoint joinPoint) throws Throwable {
		System.out.printf("Checking if offer is already accepted or counter offers exist "
				+ " prior to the executuion of the metohd %s\n", joinPoint.getSignature().getName());
		
		Long offerId = (Long) joinPoint.getArgs()[0];		

		Offer offer = offerRepository.findById(offerId).orElse(null);
		if(!offer.getOfferStatus().equals("open")){
			throw new OfferValidationException("Offer has already been accepted");
		}
		
		List<CounterOffer> counterOffers = counterOfferRepository.findAllByProposedOnOfferID(offerId);
		if(!counterOffers.isEmpty()) {
			for(CounterOffer counterOffer : counterOffers) {
				if(counterOffer.getAccepted()==0) {
					throw new OfferValidationException("Offer has open counter proposals");
				}
			}
		}
			
	}

}

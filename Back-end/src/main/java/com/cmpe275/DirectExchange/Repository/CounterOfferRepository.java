package com.cmpe275.DirectExchange.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.CounterOffer;

public interface CounterOfferRepository extends JpaRepository<CounterOffer, Long> {
    
//    @Query("SELECT o FROM CounterOffer o WHERE (o.OfferID = :OfferID)")
//	List<CounterOffer> findByOfferID(@Param("OfferID") Long OfferID);
    
    List<CounterOffer> findAllByProposedOnOfferID(Long proposedOnOfferID);
    
}


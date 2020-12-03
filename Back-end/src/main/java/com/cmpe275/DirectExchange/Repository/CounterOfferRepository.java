package com.cmpe275.DirectExchange.Repository;

import java.util.List;

import com.cmpe275.DirectExchange.Entity.CounterOffer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CounterOfferRepository extends JpaRepository<CounterOffer, Long> {
    
    @Query("SELECT o FROM CounterOffer o WHERE (o.OfferID = :OfferID)")
	List<CounterOffer> findByOfferID(@Param("OfferID") Long OfferID);
    
    
}


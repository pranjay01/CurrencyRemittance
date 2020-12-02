package com.cmpe275.DirectExchange.Repository;

import com.cmpe275.DirectExchange.Entity.CounterOffer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CounterOfferRepository extends JpaRepository<CounterOffer, Long> {
    
}


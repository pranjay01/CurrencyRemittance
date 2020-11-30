package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

}

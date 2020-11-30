package com.cmpe275.DirectExchange.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {

	List<Offer> findByUserIdAndOfferStatus(Long userId, String offerStatus);
	
	List<Offer> findByUserIdAndOfferStatusNot(Long userId, String offerStatus);
}

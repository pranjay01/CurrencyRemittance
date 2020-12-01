package com.cmpe275.DirectExchange.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Entity.User;

public interface OfferRepository extends JpaRepository<Offer, Long> {

	List<Offer> findByUserAndOfferStatus(User user, String offerStatus);
	
	List<Offer> findByUserAndOfferStatusNot(User user, String offerStatus);
	
	List<Offer> findByOfferStatus(String offerStatus);
	
	@Query("SELECT o FROM Offer o WHERE (:sourceCurrency is null or o.sourceCurrency = :sourceCurrency) "
			+ "and (:sourceAmount is null or o.sourceAmount = :sourceAmount) "
			+ "and (:destinationCurrency is null or o.destinationCurrency = :destinationCurrency) "
			+ "and (:destinationAmount is null or o.destinationAmount = :destinationAmount) "
			+ "and (:offerStatus is null or o.offerStatus = :offerStatus) ")
	List<Offer> findBySourceCurrencyAndSourceAmountAndDestinationCurrencyAndDestinationAmountAndOfferStatus (@Param("sourceCurrency") String sourceCurrency, 
			@Param("sourceAmount") Double sourceAmount, @Param("destinationCurrency") String destinationCurrency, 
			@Param("destinationAmount") Double destinationAmount, @Param("offerStatus") String offerStatus);
}

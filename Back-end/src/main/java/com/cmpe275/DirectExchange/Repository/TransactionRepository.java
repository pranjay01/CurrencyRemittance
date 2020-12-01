package com.cmpe275.DirectExchange.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cmpe275.DirectExchange.Entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	
	@Query(value = "SELECT max(requestID) FROM Transaction")
	public Long max();
	
	Transaction findByOfferID(Long offerID);
	
	List<Transaction> findByRequestID(Long requestID);

}

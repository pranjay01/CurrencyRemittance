	package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.ConfirmationToken;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
	
	ConfirmationToken findByConfirmationToken(String confirmationToken);
}

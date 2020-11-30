package com.cmpe275.DirectExchange.Repository;

import com.cmpe275.DirectExchange.Entity.ExchangeRate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExchangeRateRepository extends JpaRepository<ExchangeRate, Long> {
    
}

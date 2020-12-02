package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.TransactionUserMap;

public interface TransactionUserMapRepository extends JpaRepository<TransactionUserMap, Long> {

}

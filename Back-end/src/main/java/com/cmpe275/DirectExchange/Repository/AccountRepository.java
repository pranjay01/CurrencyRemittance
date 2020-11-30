package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

}

package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.cmpe275.DirectExchange.Entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {

    @Query("SELECT o FROM Account o WHERE (o.userId = :userId)")
	List<Account> findByuserId(@Param("userId") Long userId);
    
}

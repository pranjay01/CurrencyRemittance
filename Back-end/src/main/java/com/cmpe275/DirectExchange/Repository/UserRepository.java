package com.cmpe275.DirectExchange.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cmpe275.DirectExchange.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}

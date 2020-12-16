package com.cmpe275.DirectExchange.Service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Entity.TransactionUserMap;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Repository.TransactionUserMapRepository;

@Service
public class TransactionUserMapService {
	
	@Autowired
	TransactionUserMapRepository transactionUserMapRepository;
	
	@Transactional
	public void addMapping(Transaction transaction, User user) {
		TransactionUserMap transactionUserMap = new TransactionUserMap(transaction, user);
		transactionUserMapRepository.save(transactionUserMap);
	}
	
}

package com.cmpe275.DirectExchange.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.Account;
import com.cmpe275.DirectExchange.Repository.AccountRepository;

@Service
public class AccountService {
	
	@Autowired
	AccountRepository accountRepository;

	@Transactional
	public Account registerAccount(Long userId, String bankName, String country, Long accountNumber, String owner,
			String address, String primaryCurrency, String accountType) {
		Account account = new Account(userId, bankName, country, accountNumber, owner, address, primaryCurrency, accountType);
		return accountRepository.save(account);
	}

	public List<Account> searchAllAccounts(Long userId) {
		List<Account> accounts = new ArrayList<Account>();
		
		accounts.addAll(accountRepository.findByuserId(userId));
		
		return accounts;
	}

}

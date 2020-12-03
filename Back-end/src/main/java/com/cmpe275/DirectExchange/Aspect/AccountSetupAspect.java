package com.cmpe275.DirectExchange.Aspect;

import java.util.List;

import javax.security.auth.login.AccountNotFoundException;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.cmpe275.DirectExchange.Entity.Account;
import com.cmpe275.DirectExchange.Repository.AccountRepository;

@Aspect
@Order(0)
public class AccountSetupAspect {
	
	@Autowired
	AccountRepository AccountRepository;
	
	@Before("execution(public * com.cmpe275.DirectExchange.Service.OfferService.createOffer(..))")
	public void checkAccountSetup(JoinPoint joinPoint) throws Throwable {
		System.out.printf("Checking accounts exist in source and destination countries"
				+ " prior to the executuion of the metohd %s\n", joinPoint.getSignature().getName());
		
		Long userId = (Long) joinPoint.getArgs()[0];
		String sourceCountry = (String) joinPoint.getArgs()[1];
		String destinationCountry = (String) joinPoint.getArgs()[4];
		
		List<Account> sourceCountryAccounts = AccountRepository.findByUserIdAndCountry(userId, sourceCountry);
		boolean sourceAccountFound=false;
		for(Account account : sourceCountryAccounts) {
			if(account.getAccountType().equals("sending") || account.getAccountType().equals("both")) {
				sourceAccountFound=true;
				break;
			}
		}
		
		if(!sourceAccountFound)
			throw new AccountNotFoundException("Account not found for the user in source country");
		
		List<Account> destCountryAccounts = AccountRepository.findByUserIdAndCountry(userId, destinationCountry);
		boolean destAccountFound=false;
		for(Account account : destCountryAccounts) {
			if(account.getAccountType().equals("receiving") || account.getAccountType().equals("both")) {
				destAccountFound=true;
				break;
			}
		}
		
		if(!destAccountFound)
			throw new AccountNotFoundException("Account not found for the user in destination country");
		
	}

}

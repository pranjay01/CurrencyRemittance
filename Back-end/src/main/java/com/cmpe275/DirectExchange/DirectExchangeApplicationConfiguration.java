package com.cmpe275.DirectExchange;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import com.cmpe275.DirectExchange.Aspect.AccountSetupAspect;
import com.cmpe275.DirectExchange.Aspect.OfferValidationAspect;

@Configuration
@EnableAspectJAutoProxy
public class DirectExchangeApplicationConfiguration {

	@Bean
	public ModelMapper modelMapper() {
	    return new ModelMapper();
	}
	
	@Bean
	public AccountSetupAspect getAccountSetupAspectBean() {
		return new AccountSetupAspect();
	}
	
	@Bean
	public OfferValidationAspect getOfferValidationAspectBean() {
		return new OfferValidationAspect();
	}
}

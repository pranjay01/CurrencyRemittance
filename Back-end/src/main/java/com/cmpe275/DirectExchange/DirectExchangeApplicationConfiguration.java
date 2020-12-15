package com.cmpe275.DirectExchange;

import java.io.IOException;
import java.util.Properties;

import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.exception.VelocityException;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.ui.velocity.VelocityEngineFactory;

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
	
	@Bean
    public VelocityEngine getVelocityEngine() throws VelocityException, IOException {
        VelocityEngineFactory velocityEngineFactory = new VelocityEngineFactory();
        Properties props = new Properties();
        props.put("resource.loader", "class");
        props.put("class.resource.loader.class", "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
 
        velocityEngineFactory.setVelocityProperties(props);
        return velocityEngineFactory.createVelocityEngine();
    }
}

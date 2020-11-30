package com.cmpe275.DirectExchange.Service;

import java.util.List;

import com.cmpe275.DirectExchange.Entity.ExchangeRate;
import com.cmpe275.DirectExchange.Repository.ExchangeRateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExchangeRateService {

    @Autowired
    ExchangeRateRepository exchangeRateRepository;

    public Long addexchangeRate(String currencyType, String country, double usdConversionRate) {
        ExchangeRate exchangeRate = new ExchangeRate(currencyType, country, usdConversionRate);
        exchangeRateRepository.save(exchangeRate);

        return exchangeRate.getExchangeID();
    }

    public List<ExchangeRate> getExchangeRate() {
        List<ExchangeRate> exchangeRate = exchangeRateRepository.findAll();
        
        return exchangeRate;

    }
    
}

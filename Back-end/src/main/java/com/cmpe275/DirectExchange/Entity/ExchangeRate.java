package com.cmpe275.DirectExchange.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude (Include.NON_NULL)
@Entity
@Table(name="EXCHANGE_RATE")
public class ExchangeRate {
    
    @Id
	@Column(name="ExchangeID")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long exchangeID;
    
    @Column(name="CurrencyType")
    private String currencyType;

    @Column(name="Country")
    private String country;

    @Column(name="USDConversionRate")
    private double usdConversionRate;

	public ExchangeRate() {
	}

	public ExchangeRate(String currencyType, String country, double usdConversionRate) {
        super();
		this.currencyType = currencyType;
		this.country = country;
		this.usdConversionRate = usdConversionRate;
    }

	public Long getExchangeID() {
		return exchangeID;
	}

	public String getCurrencyType() {
		return currencyType;
	}

	public void setCurrencyType(String currencyType) {
		this.currencyType = currencyType;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public double getUsdConversionRate() {
		return usdConversionRate;
	}

	public void setUsdConversionRate(double usdConversionRate) {
		this.usdConversionRate = usdConversionRate;
	}
	  
}

package com.cmpe275.DirectExchange.Helper;

import com.cmpe275.DirectExchange.Entity.User;
import java.sql.Date;

public class OfferDTODeep {
    
    Long offerId;
	UserDTODeep user;
	String sourceCountry;
	String sourceCurrency;
	Double sourceAmount;
	String destinationCountry;
	String destinationCurrency;
	Double destinationAmount;
	Double exchangeRate;
	Date expirationDate;
	Integer allowCounterOffers;
	Integer splitExchange;
	String offerStatus;
	Double serviceFee;
	Double minAmount;
    Double maxAmount;
	public OfferDTODeep(Long offerId, UserDTODeep user, String sourceCountry, String sourceCurrency, Double sourceAmount,
			String destinationCountry, String destinationCurrency, Double destinationAmount, Double exchangeRate,
			Date expirationDate, Integer allowCounterOffers, Integer splitExchange, String offerStatus,
			Double serviceFee, Double minAmount, Double maxAmount) {
		this.offerId = offerId;
		this.user = user;
		this.sourceCountry = sourceCountry;
		this.sourceCurrency = sourceCurrency;
		this.sourceAmount = sourceAmount;
		this.destinationCountry = destinationCountry;
		this.destinationCurrency = destinationCurrency;
		this.destinationAmount = destinationAmount;
		this.exchangeRate = exchangeRate;
		this.expirationDate = expirationDate;
		this.allowCounterOffers = allowCounterOffers;
		this.splitExchange = splitExchange;
		this.offerStatus = offerStatus;
		this.serviceFee = serviceFee;
		this.minAmount = minAmount;
		this.maxAmount = maxAmount;
    }
    
	public Long getOfferId() {
		return offerId;
	}
	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}
	public UserDTODeep getUser() {
		return user;
	}
	public void setUser(UserDTODeep user) {
		this.user = user;
	}
	public String getSourceCountry() {
		return sourceCountry;
	}
	public void setSourceCountry(String sourceCountry) {
		this.sourceCountry = sourceCountry;
	}
	public String getSourceCurrency() {
		return sourceCurrency;
	}
	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}
	public Double getSourceAmount() {
		return sourceAmount;
	}
	public void setSourceAmount(Double sourceAmount) {
		this.sourceAmount = sourceAmount;
	}
	public String getDestinationCountry() {
		return destinationCountry;
	}
	public void setDestinationCountry(String destinationCountry) {
		this.destinationCountry = destinationCountry;
	}
	public String getDestinationCurrency() {
		return destinationCurrency;
	}
	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}
	public Double getDestinationAmount() {
		return destinationAmount;
	}
	public void setDestinationAmount(Double destinationAmount) {
		this.destinationAmount = destinationAmount;
	}
	public Double getExchangeRate() {
		return exchangeRate;
	}
	public void setExchangeRate(Double exchangeRate) {
		this.exchangeRate = exchangeRate;
	}
	public Date getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	public Integer getAllowCounterOffers() {
		return allowCounterOffers;
	}
	public void setAllowCounterOffers(Integer allowCounterOffers) {
		this.allowCounterOffers = allowCounterOffers;
	}
	public Integer getSplitExchange() {
		return splitExchange;
	}
	public void setSplitExchange(Integer splitExchange) {
		this.splitExchange = splitExchange;
	}
	public String getOfferStatus() {
		return offerStatus;
	}
	public void setOfferStatus(String offerStatus) {
		this.offerStatus = offerStatus;
	}
	public Double getServiceFee() {
		return serviceFee;
	}
	public void setServiceFee(Double serviceFee) {
		this.serviceFee = serviceFee;
	}
	public Double getMinAmount() {
		return minAmount;
	}
	public void setMinAmount(Double minAmount) {
		this.minAmount = minAmount;
	}
	public Double getMaxAmount() {
		return maxAmount;
	}
	public void setMaxAmount(Double maxAmount) {
		this.maxAmount = maxAmount;
	}
    
    
    
}

package com.cmpe275.DirectExchange.Entity;

import java.sql.Date;

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
@Table(name="OFFER")
public class Offer {
	
	@Id
	@Column(name="OfferID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long offerId;
	
	@Column(name="UserID")
	Long userId;
	
	@Column(name="SourceCountry")
	String sourceCountry;
	
	@Column(name="SourceCurrency")
	String sourceCurrency;
	
	@Column(name="SourceAmount")
	Double sourceAmount;
	
	@Column(name="DestinationCountry")
	String destinationCountry;
	
	@Column(name="DestinationCurrency")
	String destinationCurrency;
	
	@Column(name="ExchangeRate")
	Double exchangeRate;
	
	@Column(name="ExpirationDate")
	Date expirationDate;
	
	@Column(name="AllowCounterOffers")
	Integer allowCounterOffers;
	
	@Column(name="SplitExchange")
	Integer splitExchange;
	
	@Column(name="OfferStatus")
	String offerStatus;
	
	@Column(name="ServiceFee")
	Double serviceFee;
	
	@Column(name="MinAmount")
	Double minAmount;
	
	@Column(name="MaxAmount")
	Double maxAmount;

	public Offer(Long userId, String sourceCountry, String sourceCurrency, Double sourceAmount,
			String destinationCountry, String destinationCurrency, Double exchangeRate, Date expirationDate,
			Integer allowCounterOffers, Integer splitExchange, String offerStatus) {
		super();
		this.userId = userId;
		this.sourceCountry = sourceCountry;
		this.sourceCurrency = sourceCurrency;
		this.sourceAmount = sourceAmount;
		this.destinationCountry = destinationCountry;
		this.destinationCurrency = destinationCurrency;
		this.exchangeRate = exchangeRate;
		this.expirationDate = expirationDate;
		this.allowCounterOffers = allowCounterOffers;
		this.splitExchange = splitExchange;
		this.offerStatus = offerStatus;
		updateLimits(sourceAmount);
	}

	public Long getOfferId() {
		return offerId;
	}

	public void setOfferId(Long offerId) {
		this.offerId = offerId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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
		updateLimits(sourceAmount);
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
	
	private void updateLimits(Double amount) {
		this.serviceFee = ((0.05/100)*amount);
		this.minAmount = (amount - ((10.0/100.0)*amount));
		this.maxAmount = (amount + ((10.0/100.0)*amount));
	}

}

package com.cmpe275.DirectExchange.Helper;

import java.sql.Date;
import java.util.List;

public class TransactionDTODeep {

	Long id;
	Long offerID;
	Long userID;
	String transactionStatus;
	Double receivedAmount;
	Double transferredAmount;
	String sourceCurrency;
	String destinationCurrency;
	Double exchangeRate;
	Date createdDate;
	List<TransactionUserMapDTOShallow> receivingParties;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getOfferID() {
		return offerID;
	}
	public void setOfferID(Long offerID) {
		this.offerID = offerID;
	}
	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	public String getTransactionStatus() {
		return transactionStatus;
	}
	public void setTransactionStatus(String transactionStatus) {
		this.transactionStatus = transactionStatus;
	}
	public Double getReceivedAmount() {
		return receivedAmount;
	}
	public void setReceivedAmount(Double receivedAmount) {
		this.receivedAmount = receivedAmount;
	}
	public Double getTransferredAmount() {
		return transferredAmount;
	}
	public void setTransferredAmount(Double transferredAmount) {
		this.transferredAmount = transferredAmount;
	}
	public String getSourceCurrency() {
		return sourceCurrency;
	}
	public void setSourceCurrency(String sourceCurrency) {
		this.sourceCurrency = sourceCurrency;
	}
	public String getDestinationCurrency() {
		return destinationCurrency;
	}
	public void setDestinationCurrency(String destinationCurrency) {
		this.destinationCurrency = destinationCurrency;
	}
	public List<TransactionUserMapDTOShallow> getReceivingParties() {
		return receivingParties;
	}
	public void setReceivingParties(List<TransactionUserMapDTOShallow> receivingParties) {
		this.receivingParties = receivingParties;
	}
	public Double getExchangeRate() {
		return exchangeRate;
	}
	public void setExchangeRate(Double exchangeRate) {
		this.exchangeRate = exchangeRate;
	}
	public Date getCreatedDate() {
		return createdDate;
	}	
	
}

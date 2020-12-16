package com.cmpe275.DirectExchange.Entity;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "TRANSACTION")
public class Transaction {

	@Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	
	@Column(name="RequestID")
	Long requestID;
	
	@Column(name="OfferID")
	Long offerID;
	
	@Column(name="UserID")
	Long userID;
	
	@Column(name="TransactionStatus")
	String transactionStatus;
	
	@Column(name="ReceivedAmount")
	Double receivedAmount;
	
	@Column(name="TransferredAmount")
	Double transferredAmount;
	
	@Column(name="SourceCurrency")
	String sourceCurrency;
	
	@Column(name="DestinationCurrency")
	String destinationCurrency;

	@Column(name="USDConvertedAmount")
	Double usdConvertedAmount;

	@Column(name="ExchangeRate")
	Double exchangeRate;

	@Column(name="Created_Date")
	Timestamp createdDate;
	
	@OneToMany(mappedBy = "transaction")
	@LazyCollection(LazyCollectionOption.TRUE)
	List<TransactionUserMap> receivingParties;
	
	public Transaction() {
		super();
	}

	public Transaction(Long requestID, Long offerID, Long userID, String transactionStatus, Double exchangeRate) {
		super();
		this.requestID = requestID;
		this.offerID = offerID;
		this.userID = userID;
		this.transactionStatus = transactionStatus;
		this.exchangeRate = exchangeRate;
	}

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

	public Long getRequestID() {
		return requestID;
	}

	public void setRequestID(Long requestID) {
		this.requestID = requestID;
	}

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
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

	public List<TransactionUserMap> getReceivingParties() {
		return receivingParties;
	}

	public void setReceivingParties(List<TransactionUserMap> receivingParties) {
		this.receivingParties = receivingParties;
	}

	public Double getUsdConvertedAmount() {
		return usdConvertedAmount;
	}

	public void setUsdConvertedAmount(Double usdConvertedAmount) {
		this.usdConvertedAmount = usdConvertedAmount;
	}

	public Double getExchangeRate() {
		return exchangeRate;
	}

	public void setExchangeRate(Double exchangeRate) {
		this.exchangeRate = exchangeRate;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}
}

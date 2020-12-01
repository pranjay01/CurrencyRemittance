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
@Table(name = "TRANSACTION")
public class Transaction {

	@Id
	@Column(name="TransactionID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long transactionID;
	
	@Column(name="RequestID")
	Long requestID;
	
	@Column(name="OfferID")
	Long offerID;
	
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

	public Transaction() {
		super();
	}

	public Transaction(Long requestID, Long offerID, String transactionStatus) {
		super();
		this.requestID = requestID;
		this.offerID = offerID;
		this.transactionStatus = transactionStatus;
	}

	public Long getTransactionID() {
		return transactionID;
	}

	public void setTransactionID(Long transactionID) {
		this.transactionID = transactionID;
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
	
}

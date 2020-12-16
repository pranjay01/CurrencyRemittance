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
@Table(name="ACCOUNT")
public class Account {
	
	@Id
	@Column(name="AccountID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long accountId;
	
	@Column(name="UserID")
	Long userId;
	
	@Column(name="BankName")
	String bankName;
	
	@Column(name="Country")
	String country;
	
	@Column(name="AccountNumber")
	Long accountNumber;
	
	@Column(name="Owner")
	String owner;
	
	@Column(name="Address")
	String address;
	
	@Column(name="PrimaryCurrency")
	String primaryCurrency;
	
	@Column(name="AccountType")
	String accountType;
	
	public Account() {
		super();
	}

	public Account(Long userId, String bankName, String country, Long accountNumber, String owner,
			String address, String primaryCurrency, String accountType) {
		super();
		this.userId = userId;
		this.bankName = bankName;
		this.country = country;
		this.accountNumber = accountNumber;
		this.owner = owner;
		this.address = address;
		this.primaryCurrency = primaryCurrency;
		this.accountType = accountType;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPrimaryCurrency() {
		return primaryCurrency;
	}

	public void setPrimaryCurrency(String primaryCurrency) {
		this.primaryCurrency = primaryCurrency;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	
}

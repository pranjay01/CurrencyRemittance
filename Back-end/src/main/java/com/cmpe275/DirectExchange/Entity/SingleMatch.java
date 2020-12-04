package com.cmpe275.DirectExchange.Entity;

public class SingleMatch {
    
    private int row_num;
    private Long OfferID;
    private Long MatchingOfferId;
    private Long UserID;
    private Long MatchingUserId;
    private double SourceAmount;
    private double MatchingSourceAmount;
    private double DestinationAmount;
    private double MatchingDestinationAmount;
    private String SourceCurrency;
    private String DestinationCurrency;
    private String Nickname;
    private int AllowCounterOffers;
    private double ExchangeRate;
    private String ExpirationDate;
    private double Difference;
    
	public SingleMatch(int row_num, Long offerID, Long matchingOfferId, Long userID, Long matchingUserId,
			double sourceAmount, double matchingSourceAmount, double destinationAmount,
			double matchingDestinationAmount, String sourceCurrency, String destinationCurrency, String nickname,
			int allowCounterOffers, double exchangeRate, String expirationDate, double difference) {
		this.row_num = row_num;
		OfferID = offerID;
		MatchingOfferId = matchingOfferId;
		UserID = userID;
		MatchingUserId = matchingUserId;
		SourceAmount = sourceAmount;
		MatchingSourceAmount = matchingSourceAmount;
		DestinationAmount = destinationAmount;
		MatchingDestinationAmount = matchingDestinationAmount;
		SourceCurrency = sourceCurrency;
		DestinationCurrency = destinationCurrency;
		Nickname = nickname;
		AllowCounterOffers = allowCounterOffers;
		ExchangeRate = exchangeRate;
		ExpirationDate = expirationDate;
		Difference = difference;
	}

	public SingleMatch() {
	}

	public int getRow_num() {
		return row_num;
	}

	public void setRow_num(int row_num) {
		this.row_num = row_num;
	}

	public Long getOfferID() {
		return OfferID;
	}

	public void setOfferID(Long offerID) {
		OfferID = offerID;
	}

	public Long getMatchingOfferId() {
		return MatchingOfferId;
	}

	public void setMatchingOfferId(Long matchingOfferId) {
		MatchingOfferId = matchingOfferId;
	}

	public Long getUserID() {
		return UserID;
	}

	public void setUserID(Long userID) {
		UserID = userID;
	}

	public Long getMatchingUserId() {
		return MatchingUserId;
	}

	public void setMatchingUserId(Long matchingUserId) {
		MatchingUserId = matchingUserId;
	}

	public double getSourceAmount() {
		return SourceAmount;
	}

	public void setSourceAmount(double sourceAmount) {
		SourceAmount = sourceAmount;
	}

	public double getMatchingSourceAmount() {
		return MatchingSourceAmount;
	}

	public void setMatchingSourceAmount(double matchingSourceAmount) {
		MatchingSourceAmount = matchingSourceAmount;
	}

	public double getDestinationAmount() {
		return DestinationAmount;
	}

	public void setDestinationAmount(double destinationAmount) {
		DestinationAmount = destinationAmount;
	}

	public double getMatchingDestinationAmount() {
		return MatchingDestinationAmount;
	}

	public void setMatchingDestinationAmount(double matchingDestinationAmount) {
		MatchingDestinationAmount = matchingDestinationAmount;
	}

	public String getSourceCurrency() {
		return SourceCurrency;
	}

	public void setSourceCurrency(String sourceCurrency) {
		SourceCurrency = sourceCurrency;
	}

	public String getDestinationCurrency() {
		return DestinationCurrency;
	}

	public void setDestinationCurrency(String destinationCurrency) {
		DestinationCurrency = destinationCurrency;
	}

	public String getNickname() {
		return Nickname;
	}

	public void setNickname(String nickname) {
		Nickname = nickname;
	}

	public int getAllowCounterOffers() {
		return AllowCounterOffers;
	}

	public void setAllowCounterOffers(int allowCounterOffers) {
		AllowCounterOffers = allowCounterOffers;
	}

	public double getExchangeRate() {
		return ExchangeRate;
	}

	public void setExchangeRate(double exchangeRate) {
		ExchangeRate = exchangeRate;
	}

	public String getExpirationDate() {
		return ExpirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		ExpirationDate = expirationDate;
	}

	public double getDifference() {
		return Difference;
	}

	public void setDifference(double difference) {
		Difference = difference;
	}

    



}

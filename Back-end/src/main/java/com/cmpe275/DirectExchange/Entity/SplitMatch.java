package com.cmpe275.DirectExchange.Entity;

public class SplitMatch {

    private int row_num;
    private Long OfferID;
    private Long UserID;
    private double SourceAmount;
    private double DestinationAmount;
    private String SourceCurrency;
    private String DestinationCurrency;
    private Double MatchingDestinationAmount1;
    private Double MatchingSourceAmount1;
    private Long MatchingUserId1;
    private Long MatchingOfferId1;
    private String MatchingNickName1;
    private int MatchningAllowCounterOffers1;
    private Double MatchingExchangeRate1;
    private String MatchingExpirationDate1;
    private Double MatchingDestinationAmount2;
    private Double MatchingSourceAmount2;
    private Long MatchingUserId2;
    private Long MatchingOfferId2;
    private String MatchingOfferNickName2;
    private int MatchningAllowCounterOffers2;
    private Double MatchingExchangeRate2;
    private String MatchingExpirationDate2;
	private Double Difference;
	
	public SplitMatch() {

	}
    
	public SplitMatch(int row_num, Long offerID, Long userID, double sourceAmount, double destinationAmount,
			String sourceCurrency, String destinationCurrency, Double matchingDestinationAmount1,
			Double matchingSourceAmount1, Long matchingUserId1, Long matchingOfferId1, String matchingNickName1,
			int matchningAllowCounterOffers1, Double matchingExchangeRate1, String matchingExpirationDate1,
			Double matchingDestinationAmount2, Double matchingSourceAmount2, Long matchingUserId2,
			Long matchingOfferId2, String matchingOfferNickName2, int matchningAllowCounterOffers2,
			Double matchingExchangeRate2, String matchingExpirationDate2, Double difference) {
		this.row_num = row_num;
		OfferID = offerID;
		UserID = userID;
		SourceAmount = sourceAmount;
		DestinationAmount = destinationAmount;
		SourceCurrency = sourceCurrency;
		DestinationCurrency = destinationCurrency;
		MatchingDestinationAmount1 = matchingDestinationAmount1;
		MatchingSourceAmount1 = matchingSourceAmount1;
		MatchingUserId1 = matchingUserId1;
		MatchingOfferId1 = matchingOfferId1;
		MatchingNickName1 = matchingNickName1;
		MatchningAllowCounterOffers1 = matchningAllowCounterOffers1;
		MatchingExchangeRate1 = matchingExchangeRate1;
		MatchingExpirationDate1 = matchingExpirationDate1;
		MatchingDestinationAmount2 = matchingDestinationAmount2;
		MatchingSourceAmount2 = matchingSourceAmount2;
		MatchingUserId2 = matchingUserId2;
		MatchingOfferId2 = matchingOfferId2;
		MatchingOfferNickName2 = matchingOfferNickName2;
		MatchningAllowCounterOffers2 = matchningAllowCounterOffers2;
		MatchingExchangeRate2 = matchingExchangeRate2;
		MatchingExpirationDate2 = matchingExpirationDate2;
		Difference = difference;
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

	public Long getUserID() {
		return UserID;
	}

	public void setUserID(Long userID) {
		UserID = userID;
	}

	public double getSourceAmount() {
		return SourceAmount;
	}

	public void setSourceAmount(double sourceAmount) {
		SourceAmount = sourceAmount;
	}

	public double getDestinationAmount() {
		return DestinationAmount;
	}

	public void setDestinationAmount(double destinationAmount) {
		DestinationAmount = destinationAmount;
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

	public Double getMatchingDestinationAmount1() {
		return MatchingDestinationAmount1;
	}

	public void setMatchingDestinationAmount1(Double matchingDestinationAmount1) {
		MatchingDestinationAmount1 = matchingDestinationAmount1;
	}

	public Double getMatchingSourceAmount1() {
		return MatchingSourceAmount1;
	}

	public void setMatchingSourceAmount1(Double matchingSourceAmount1) {
		MatchingSourceAmount1 = matchingSourceAmount1;
	}

	public Long getMatchingUserId1() {
		return MatchingUserId1;
	}

	public void setMatchingUserId1(Long matchingUserId1) {
		MatchingUserId1 = matchingUserId1;
	}

	public Long getMatchingOfferId1() {
		return MatchingOfferId1;
	}

	public void setMatchingOfferId1(Long matchingOfferId1) {
		MatchingOfferId1 = matchingOfferId1;
	}

	public String getMatchingNickName1() {
		return MatchingNickName1;
	}

	public void setMatchingNickName1(String matchingNickName1) {
		MatchingNickName1 = matchingNickName1;
	}

	public int getMatchningAllowCounterOffers1() {
		return MatchningAllowCounterOffers1;
	}

	public void setMatchningAllowCounterOffers1(int matchningAllowCounterOffers1) {
		MatchningAllowCounterOffers1 = matchningAllowCounterOffers1;
	}

	public Double getMatchingExchangeRate1() {
		return MatchingExchangeRate1;
	}

	public void setMatchingExchangeRate1(Double matchingExchangeRate1) {
		MatchingExchangeRate1 = matchingExchangeRate1;
	}

	public String getMatchingExpirationDate1() {
		return MatchingExpirationDate1;
	}

	public void setMatchingExpirationDate1(String matchingExpirationDate1) {
		MatchingExpirationDate1 = matchingExpirationDate1;
	}

	public Double getMatchingDestinationAmount2() {
		return MatchingDestinationAmount2;
	}

	public void setMatchingDestinationAmount2(Double matchingDestinationAmount2) {
		MatchingDestinationAmount2 = matchingDestinationAmount2;
	}

	public Double getMatchingSourceAmount2() {
		return MatchingSourceAmount2;
	}

	public void setMatchingSourceAmount2(Double matchingSourceAmount2) {
		MatchingSourceAmount2 = matchingSourceAmount2;
	}

	public Long getMatchingUserId2() {
		return MatchingUserId2;
	}

	public void setMatchingUserId2(Long matchingUserId2) {
		MatchingUserId2 = matchingUserId2;
	}

	public Long getMatchingOfferId2() {
		return MatchingOfferId2;
	}

	public void setMatchingOfferId2(Long matchingOfferId2) {
		MatchingOfferId2 = matchingOfferId2;
	}

	public String getMatchingOfferNickName2() {
		return MatchingOfferNickName2;
	}

	public void setMatchingOfferNickName2(String matchingOfferNickName2) {
		MatchingOfferNickName2 = matchingOfferNickName2;
	}

	public int getMatchningAllowCounterOffers2() {
		return MatchningAllowCounterOffers2;
	}

	public void setMatchningAllowCounterOffers2(int matchningAllowCounterOffers2) {
		MatchningAllowCounterOffers2 = matchningAllowCounterOffers2;
	}

	public Double getMatchingExchangeRate2() {
		return MatchingExchangeRate2;
	}

	public void setMatchingExchangeRate2(Double matchingExchangeRate2) {
		MatchingExchangeRate2 = matchingExchangeRate2;
	}

	public String getMatchingExpirationDate2() {
		return MatchingExpirationDate2;
	}

	public void setMatchingExpirationDate2(String matchingExpirationDate2) {
		MatchingExpirationDate2 = matchingExpirationDate2;
	}

	public Double getDifference() {
		return Difference;
	}

	public void setDifference(Double difference) {
		Difference = difference;
	}

    


}
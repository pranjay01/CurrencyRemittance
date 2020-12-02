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
@Table(name="COUNTER_OFFER")
public class CounterOffer {

    @Id
	@Column(name="ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private Long ID;

    @Column(name="OfferID")
    private Long OfferID;

    @Column(name="CounterProposedAmount")
    private double CounterProposedAmount;

    @Column(name="Accepted")
    private int accepted;

    @Column(name="UserID")
    private Long userID;

    public CounterOffer() {
        super();
	} 
    
	public CounterOffer(Long offerID, double counterProposedAmount, int accepted, Long userID) {
        super();
        OfferID = offerID;
		CounterProposedAmount = counterProposedAmount;
		this.accepted = accepted;
		this.userID = userID;
    }

	public Long getID() {
		return ID;
	}

	public Long getOfferID() {
		return OfferID;
	}

	public void setOfferID(Long offerID) {
		OfferID = offerID;
	}

	public double getCounterProposedAmount() {
		return CounterProposedAmount;
	}

	public void setCounterProposedAmount(double counterProposedAmount) {
		CounterProposedAmount = counterProposedAmount;
	}

	public int getAccepted() {
		return accepted;
	}

	public void setAccepted(int accepted) {
		this.accepted = accepted;
	}

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}
   
    
}

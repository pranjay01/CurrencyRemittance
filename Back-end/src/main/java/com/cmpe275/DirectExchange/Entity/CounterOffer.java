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

    @Column(name="ProposedOnOfferID")
    private Long proposedOnOfferID;

    @Column(name="CounterProposedAmount")
    private double counterProposedAmount;

    @Column(name="Accepted")
    private int accepted;

    @Column(name="UserID")
	private Long userID;
	
	@Column(name="CounterOfferID")
	private Long counterOfferID;
	
	@Column(name="SourceOfferID")
	private Long sourceOfferID;
	
	@Column(name="Split1OfferID")
	private Long split1OfferID;
	
	@Column(name="Split2OfferID")
	private Long split2OfferID;

    public CounterOffer() {
        super();
	} 
    
	public CounterOffer(Long proposedOnOfferID, double counterProposedAmount, int accepted, Long userID,
			Long counterOfferID, Long sourceOfferID, Long split1OfferID, Long split2OfferID) {
		super();
		this.proposedOnOfferID = proposedOnOfferID;
		this.counterProposedAmount = counterProposedAmount;
		this.accepted = accepted;
		this.userID = userID;
		this.counterOfferID = counterOfferID;
		this.sourceOfferID = sourceOfferID;
		this.split1OfferID = split1OfferID;
		this.split2OfferID = split2OfferID;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public Long getProposedOnOfferID() {
		return proposedOnOfferID;
	}

	public void setProposedOnOfferID(Long proposedOnOfferID) {
		this.proposedOnOfferID = proposedOnOfferID;
	}

	public double getCounterProposedAmount() {
		return counterProposedAmount;
	}

	public void setCounterProposedAmount(double counterProposedAmount) {
		this.counterProposedAmount = counterProposedAmount;
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

	public Long getCounterOfferID() {
		return counterOfferID;
	}

	public void setCounterOfferID(Long counterOfferID) {
		this.counterOfferID = counterOfferID;
	}

	public Long getSourceOfferID() {
		return sourceOfferID;
	}

	public void setSourceOfferID(Long sourceOfferID) {
		this.sourceOfferID = sourceOfferID;
	}

	public Long getSplit1OfferID() {
		return split1OfferID;
	}

	public void setSplit1OfferID(Long split1OfferID) {
		this.split1OfferID = split1OfferID;
	}

	public Long getSplit2OfferID() {
		return split2OfferID;
	}

	public void setSplit2OfferID(Long split2OfferID) {
		this.split2OfferID = split2OfferID;
	}

}

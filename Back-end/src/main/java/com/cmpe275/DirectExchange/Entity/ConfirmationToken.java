package com.cmpe275.DirectExchange.Entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="CONFIRMATION_TOKEN")
public class ConfirmationToken {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="TokenID")
    private Long tokenId;

    @Column(name="ConfirmationToken")
    private String confirmationToken;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "UserID")
    private User user;

	public ConfirmationToken() {
		super();
	}

	public ConfirmationToken(User user) {
		super();
		this.user = user;
		this.confirmationToken = UUID.randomUUID().toString();
	}

	public Long getTokenId() {
		return tokenId;
	}

	public void setTokenId(Long tokenId) {
		this.tokenId = tokenId;
	}

	public String getConfirmationToken() {
		return confirmationToken;
	}

	public void setConfirmationToken(String confirmationToken) {
		this.confirmationToken = confirmationToken;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

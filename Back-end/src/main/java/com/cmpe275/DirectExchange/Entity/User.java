package com.cmpe275.DirectExchange.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.security.*;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@Entity
@Table(name = "SIGNUP")
public class User {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long Id;

	@Column(name = "UserName")
	String userName;

	@Column(name = "Nickname")
	String nickname;

	@Column(name = "Password")
	String password;

	@Column(name = "Status")
	String status;

	public User() {
		super();
	}

	public User(String userName, String nickname, String password, String status) {
		super();
		this.userName = userName;
		this.nickname = nickname;
		this.password = generateEncryptedPassword(password);;
		this.status = status;
	}

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = generateEncryptedPassword(password);
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String generateEncryptedPassword(String password){
		String encryptedPassword ="";
		try {
			byte[] bytesOfMessage = password.getBytes();
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] bytes = md.digest(bytesOfMessage);
			StringBuilder sb = new StringBuilder();
			for(int i = 0; i< bytes.length; i++){
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}

			encryptedPassword = sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return encryptedPassword;
	}

}

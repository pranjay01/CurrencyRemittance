package com.cmpe275.DirectExchange.Helper;

public class UserDTODeep {
    Long Id;
	String userName;
	String nickname;
	String status;
    String rating;

    public UserDTODeep(Long id, String userName, String nickname, String status, String rating) {
		Id = id;
		this.userName = userName;
		this.nickname = nickname;
		this.status = status;
		this.rating = rating;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
    }

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	

}

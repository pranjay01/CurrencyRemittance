package com.cmpe275.DirectExchange.Service;

public class ErrorDetails {

	private String message;
	
	public ErrorDetails(String message) {
		this.message = message;
	}

	
	/** 
	 * Getter for the Error Message
	 * @return String
	 */
	public String getMessage() {
		return message;
	}

	
	/** 
	 * Setter for the error message
	 * @param message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

}


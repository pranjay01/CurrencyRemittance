package com.cmpe275.DirectExchange.Service;

import javax.persistence.EntityNotFoundException;
import javax.security.auth.login.AccountNotFoundException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.cmpe275.DirectExchange.Helper.OfferValidationException;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

	
	/** 
	 * Handler for the Data Integrity Exception
	 * @param ex Exception object from the actual method
	 * @param request Requst object from the API
	 * @return ResponseEntity<ErrorDetails> 
	 */
	@ExceptionHandler(DataIntegrityViolationException.class)
	public final ResponseEntity<ErrorDetails> handleDataIntegrityViolation(DataIntegrityViolationException ex, WebRequest request) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	
	/** Handler for the Not Found Expection
	 * @param ex Exception from the actual Method
	 * @return ResponseEntity<ErrorDetails>
	 */
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleNotFound(EntityNotFoundException ex) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	
	/** 
	 * Handler for the Result Not found 
	 * @param ex Exception from the actual method
	 * @return ResponseEntity<ErrorDetails>
	 */
	@ExceptionHandler(EmptyResultDataAccessException.class)
	public ResponseEntity<ErrorDetails> handleNotFound(EmptyResultDataAccessException ex) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(AccountNotFoundException.class)
	public ResponseEntity<ErrorDetails> handleAccountNotFound(AccountNotFoundException ex) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(OfferValidationException.class)
	public ResponseEntity<ErrorDetails> handleInvalidOffer(OfferValidationException ex) {
		ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}

}

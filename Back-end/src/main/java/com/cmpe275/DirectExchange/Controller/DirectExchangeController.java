package com.cmpe275.DirectExchange.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.cmpe275.DirectExchange.Entity.Account;
import com.cmpe275.DirectExchange.Entity.CounterOffer;
import com.cmpe275.DirectExchange.Entity.ExchangeRate;
import com.cmpe275.DirectExchange.Entity.Offer;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Entity.TransactionUserMap;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Helper.TransactionDTODeep;
import com.cmpe275.DirectExchange.Repository.AccountRepository;
import com.cmpe275.DirectExchange.Service.AccountService;
import com.cmpe275.DirectExchange.Service.CounterOfferService;
import com.cmpe275.DirectExchange.Service.ExchangeRateService;
import com.cmpe275.DirectExchange.Service.OfferService;
import com.cmpe275.DirectExchange.Service.TransactionService;
import com.cmpe275.DirectExchange.Service.TransactionUserMapService;
import com.cmpe275.DirectExchange.Service.UserService;

@CrossOrigin(allowCredentials = "true",origins = "http://localhost:3000",allowedHeaders = "*",  methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT}) 
@RestController
public class DirectExchangeController {

	@Autowired
	UserService userService;

	@Autowired
	AccountService accountService;

	@Autowired
	OfferService offerService;

	@Autowired
	ExchangeRateService exchangeRateService;

	@Autowired
	TransactionService transactionService;
	
	@Autowired
	TransactionUserMapService transactionUserMapService;

	@Autowired
	CounterOfferService counterOfferService;

	@GetMapping("/")
	public String sayHello() {
		return "Hello from DirectExchange";
	}

	// merged
	@GetMapping("/user/{id}")
	public User getUser(@PathVariable("id") Long id) {
		return userService.getUser(id);
	}

	@GetMapping("/userEmail/{email}")
	public User getUserWithEmail(@PathVariable("email") String email) {
		return userService.getUserWithEmail(email);
	}

	@PostMapping("/user")
	public User signUp(@RequestParam(value="userName") String userName,
			@RequestParam(value="nickname") String nickname,
			@RequestParam(value = "password", required = false) String password,
			@RequestParam(value = "authProvider", required = false) String authProvider) {
		return userService.addUser(userName, nickname, password, "Pending", authProvider);
	}

	@PostMapping("/login")
	public User login(@RequestBody Map<String, Object> body) {
		return userService.getLoginUser(body.get("username").toString()
								 , body.get("password").toString());
									 							
	}

	// merged
	@PostMapping("/user/{id}")
	public User updateUser(@RequestParam(value="nickname", required = false) String nickname,
			@RequestParam(value="password", required = false) String password,
			@PathVariable("id") Long id) {
		return userService.updateUser(id, nickname, password);
	}

	@GetMapping(value="/confirm-account")
	public String confirmUserAccount(@RequestParam("token")String confirmationToken)
	{
		return userService.verifyUser(confirmationToken);
	}

	// merged
	@GetMapping("/user/{id}/offers")
	public List<Offer> getMyOffers(@PathVariable("id") Long id) {
		return offerService.getMyOffers(id);
	}

	// merged
	@PostMapping("/account")
	public Account registerAccount(@RequestParam(value="userId") Long userId,
			@RequestParam(value="bankName") String bankName,
			@RequestParam(value="country") String country,
			@RequestParam(value="accountNumber") Long accountNumber,
			@RequestParam(value="owner") String owner,
			@RequestParam(value="address") String address,
			@RequestParam(value="primaryCurrency") String primaryCurrency,
			@RequestParam(value = "accountType") String accountType) {
		System.out.println("sss" + userId);
		return accountService.registerAccount(userId, bankName, country, accountNumber, owner, address, primaryCurrency,
				accountType);
	}

	// merged
	@PostMapping("/offer")
	public Offer postOffer(@RequestParam(value="userId") Long userId,
			@RequestParam(value="sourceCountry") String sourceCountry,
			@RequestParam(value="sourceCurrency") String sourceCurrency,
			@RequestParam(value="sourceAmount") Double sourceAmount,
			@RequestParam(value="destinationCountry") String destinationCountry,
			@RequestParam(value="destinationCurrency") String destinationCurrency,
			@RequestParam(value="exchangeRate") Double exchangeRate,
			@RequestParam(value="expirationDate") String expirationDate, //2020-11-28
			@RequestParam(value="allowCounterOffers") Integer allowCounterOffers,
			@RequestParam(value="splitExchange") Integer splitExchange) {

		return offerService.createOffer(userId, sourceCountry, sourceCurrency, sourceAmount, 
				destinationCountry, destinationCurrency, exchangeRate, expirationDate, allowCounterOffers, splitExchange);
	}

	// merged
	@GetMapping("/searchOffers")
	public List<Offer> searchOffers(@RequestParam(value="sourceCurrency", required = false) String sourceCurrency,
			@RequestParam(value="sourceAmount", required = false) Double sourceAmount,
			@RequestParam(value="destinationCurrency", required = false) String destinationCurrency,
			@RequestParam(value="destinationAmount", required = false) Double destinationAmount){
		return offerService.searchOffers(sourceCurrency, sourceAmount, destinationCurrency, destinationAmount);
	}

	@GetMapping("/offer/{id}")
	public Offer getOfferDetails(@PathVariable("id") Long offerId) {
		return offerService.getOfferDetails(offerId);
	}
	
	@PostMapping("/offer/{id}")
	public Offer updateOfferDetails(@RequestParam(value="sourceAmount", required = false) Double sourceAmount,
			@RequestParam(value="exchangeRate", required = false) Double exchangeRate,
			@PathVariable("id") Long offerId) {
		return offerService.updateOfferDetails(offerId, sourceAmount, exchangeRate);
	}

	@PostMapping("/acceptOffer")
	public String acceptOffer(@RequestParam(value="offerId1") Long offerId1,
			@RequestParam(value="offerId2") Long offerId2,
			@RequestParam(value="offerId3", required = false) Long offerId3) {
		return transactionService.acceptOffer(offerId1, offerId2, offerId3);
	}

	@PostMapping("/offer/{id}/sendMoney")
	public String sendMoney(@PathVariable("id") Long offerId) {
		return transactionService.sendMoney(offerId);
	}

	// merged
	@GetMapping("/getConversionRate")
	public List<ExchangeRate> gExchangeRate() {
		return exchangeRateService.getExchangeRate();
	}

	@PostMapping("/insertExchangeRate")
	public Long insertExchangeRate(@RequestParam(value="currencyType") String currencyType,
			@RequestParam(value="country") String country,
			@RequestParam(value="usdConversionRate") double usdConversionRate) {
		return exchangeRateService.addexchangeRate(currencyType, country, usdConversionRate);
	}

	@PostMapping("/sendOffer")
	public String sendOffer(@RequestParam(value="senderId") Long senderId,
			@RequestParam(value="receiverId") Long receiverId,
			@RequestParam(value="mailText") String mailText) {
		return userService.sendEmail(senderId, receiverId, mailText);
	}
	
	@GetMapping("/user/{id}/transactionHistory")
	public List<TransactionDTODeep> getMyTransactions(@PathVariable("id") Long userId){
		return transactionService.getMyTransactions(userId);
	}
	
	@PostMapping("/createCounterOffer")
	public Long createCounterOffer(@RequestParam(value="offerID1") Long offerID1,
	@RequestParam(value="counterProposedAmount") double counterProposedAmount,
	@RequestParam(value="userID") Long userID,
	@RequestParam(value="offerID2") Long offerID2) {
		return counterOfferService.createCounterOffer(offerID1, counterProposedAmount, userID, offerID2);
	}

	@GetMapping("/searchCounterOffers")
	public List<CounterOffer> searchCounterOffers(@RequestParam(value="OfferID") Long OfferID){
		return counterOfferService.searchCounterOffers(OfferID);
	}

	@GetMapping("/getAllAccounts")
	public List<Account> getAllAccounts(@RequestParam(value="userId") Long userId){
		return accountService.searchAllAccounts(userId);
	}
	
}

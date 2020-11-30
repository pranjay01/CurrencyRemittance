package com.cmpe275.DirectExchange.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe275.DirectExchange.Entity.Account;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Service.AccountService;
import com.cmpe275.DirectExchange.Service.UserService;

@RestController
public class DirectExchangeController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	AccountService accountService;
	
	@GetMapping("/")
	public String sayHello() {
		return "Hello from DirectExchange";
	}
	
	@PostMapping("/user")
	public User signUp(@RequestParam(value="userName") String userName,
			@RequestParam(value="nickname") String nickname,
			@RequestParam(value="password", required = false) String password) {
		return userService.addUser(userName, nickname, password, "Pending");
	}
	
	@PostMapping("/user/{id}")
	public User updateUser(@RequestParam(value="nickname", required = false) String nickname,
			@RequestParam(value="status", required = false) String status,
			@PathVariable("id") Long id) {
		return userService.updateUser(id, nickname, status);
	}
	
	@PostMapping("/account")
	public Account registerAccount(@RequestParam(value="userId") Long userId,
			@RequestParam(value="bankName") String bankName,
			@RequestParam(value="country") String country,
			@RequestParam(value="accountNumber") Long accountNumber,
			@RequestParam(value="owner") String owner,
			@RequestParam(value="address") String address,
			@RequestParam(value="primaryCurrency") String primaryCurrency,
			@RequestParam(value="accountType") String accountType) {
		
		return accountService.registerAccount(userId, bankName, country, accountNumber, 
				owner, address, primaryCurrency, accountType);
	}

}

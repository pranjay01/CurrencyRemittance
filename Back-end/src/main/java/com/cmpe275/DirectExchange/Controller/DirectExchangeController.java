package com.cmpe275.DirectExchange.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DirectExchangeController {
	
	@GetMapping("/")
	public String sayHello() {
		return "Hello from DirectExchange";
	}

}

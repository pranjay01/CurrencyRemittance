package com.cmpe275.DirectExchange.Service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.ConfirmationToken;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Repository.ConfirmationTokenRepository;
import com.cmpe275.DirectExchange.Repository.TransactionRepository;
import com.cmpe275.DirectExchange.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	ConfirmationTokenRepository confirmationTokenRepository;

	@Autowired
	EmailVerificationService emailVerificationService;
	
	@Autowired
	TransactionRepository transactionRepository;
	
	@Value("${spring.mail.username}")
	private String email;

	@Transactional
	public User getUser(Long id) {
		User user = userRepository.findById(id).orElse(null);
		//add code to handle null
		return user;
	}

	@Transactional
	public User addUser(String userName, String nickname, String password, String status) {
		User user = new User(userName, nickname, password, status);
		userRepository.save(user);

		
		ConfirmationToken confirmationToken = new ConfirmationToken(user);
		confirmationTokenRepository.save(confirmationToken);
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(user.getUserName());
		mailMessage.setSubject("Complete Registration!");
		mailMessage.setFrom(email);
		mailMessage.setText("To confirm your account, please click here : "
				+"http://localhost:8080/confirm-account?token="+confirmationToken.getConfirmationToken());

		try {
			emailVerificationService.sendEmail(mailMessage);
		} catch (Exception exception) {
			
		}

		return user;

	}

	@Transactional
	public User updateUser(Long id, String nickname, String password) {
		User user = userRepository.findById(id).orElse(null);
		if(user != null) {
			if(nickname != null)
				user.setNickname(nickname);
			if(password != null)
				user.setPassword(password);
		}
		return userRepository.save(user);
	}

	public String verifyUser(String confirmationToken) {
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

		if(token != null)
		{
			User user = userRepository.findByUserNameIgnoreCase(token.getUser().getUserName());
			user.setStatus("Verified");
			userRepository.save(user);
			
		}

		return "User verified";
	}


	@Transactional
	public String sendEmail(Long senderId, Long receiverId, String mailText) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		User sender = userRepository.findById(senderId).orElse(null);
        User receiver = userRepository.findById(receiverId).orElse(null);
		mailMessage.setTo(receiver.getUserName());
		mailMessage.setSubject("Hello !!!");
		// mailMessage.setFrom(sender.getUserName());
		mailMessage.setFrom(email);
		mailMessage.setText(mailText);

		try {
			emailVerificationService.sendEmail(mailMessage);
			return "Message sent";
		} catch (Exception exception) {
			return "Message sending failed";
		}
	}
	
}

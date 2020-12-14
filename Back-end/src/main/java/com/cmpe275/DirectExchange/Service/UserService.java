package com.cmpe275.DirectExchange.Service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.ConfirmationToken;
import com.cmpe275.DirectExchange.Entity.Transaction;
import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Helper.UserDTODeep;
import com.cmpe275.DirectExchange.Repository.ConfirmationTokenRepository;
import com.cmpe275.DirectExchange.Repository.TransactionRepository;
import com.cmpe275.DirectExchange.Repository.TransactionUserMapRepository;
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

	@Value("${spring.mail.backendurl}")
	private String backendUrl;

	@Transactional
	public UserDTODeep getUser(Long id) {
		User user = userRepository.findById(id).orElse(null);
		//add code to handle null
		// return user;
		Double rating = calculateRating(user.getId());
		UserDTODeep userDTODeep = new UserDTODeep(user.getId(), user.getUserName(), user.getNickname(), user.getStatus(), rating.toString());
		return userDTODeep;
	}

	@Transactional
	public User getUserWithEmail(String email) {
		User user = userRepository.findByUserNameIgnoreCase(email);
		if(user == null){
			throw new EntityNotFoundException("Player Not Exists!");
		}
		return user;
	}

	@Transactional
	public User getLoginUser(String email, String password) {
		User user = getUserWithEmail(email);
		if(!user.generateEncryptedPassword(password).equals(user.getPassword())){
			throw new EntityNotFoundException("UserId Or Password Not Matching!");
		}
		
		return user;
	}
	
	

	@Transactional
	public User addUser(String userName, String nickname, String password, String status, String authProvider) {
		User user = new User(userName, nickname, password, status,authProvider);
		userRepository.save(user);

		ConfirmationToken confirmationToken = new ConfirmationToken(user);
		confirmationTokenRepository.save(confirmationToken);
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(user.getUserName());
		mailMessage.setSubject("Complete Registration!");
		mailMessage.setFrom(email);
		mailMessage.setText("To confirm your account, please click here : "
				+backendUrl+"/confirm-account?token="+confirmationToken.getConfirmationToken());

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

	public double calculateRating(long userID) {
		List<Transaction> transaction =  transactionRepository.findByUserID(userID);
		int faultCount = 0;
		for(Transaction t: transaction) {
			if(t.getTransactionStatus().compareTo("at-fault") == 0) {
				faultCount++;
			}
		}
		double rating =  ((1- (faultCount) / (transaction.size())) * 4) + 1;
		return rating;
	}

	
}

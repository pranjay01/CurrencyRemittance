package com.cmpe275.DirectExchange.Service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe275.DirectExchange.Entity.User;
import com.cmpe275.DirectExchange.Repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Transactional
	public User getUser(Long id) {
		User user = userRepository.findById(id).orElse(null);
		//add code to handle null
		return user;
	}
	
	@Transactional
	public User addUser(String userName, String nickname, String password, String status) {
		User user = new User(userName, nickname, password, status);
		return userRepository.save(user);
	}

	@Transactional
	public User updateUser(Long id, String nickname, String status) {
		User user = userRepository.findById(id).orElse(null);
		if(user != null) {
			if(nickname != null)
				user.setNickname(nickname);
			if(status != null)
				user.setStatus(status);
		}
		return userRepository.save(user);
	}
}

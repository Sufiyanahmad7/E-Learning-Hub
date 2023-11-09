package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.Topic;
import com.backend.elearning.models.User;
import com.backend.elearning.repositories.CourseRepository;
import com.backend.elearning.repositories.RegisterRepository;

@Service
public class RegisterServiceImpl implements RegisterService {

	@Autowired
	private RegisterRepository registerRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Override
	public String register(User reg) {
		registerRepository.save(reg);
		return reg.getUserName();
	}

	@Override
	public String getUserName(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findByUsername(username);
	}

	@Override
	public String getPassword(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findByPassword(username);
	}

//	@Override
//	public String getUserDetails(String username) {
//		// TODO Auto-generated method stub
//		return registerRepository.findByUserName(username);
//	}

	@Override
	public String getUserEmail(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findMailByUserName(username);
	}

	@Override
	public Integer getUserRoleId(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findRoleIdbyUsername(username);
	}

	@Override
	public String getUserRoleName(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findRoleNamebyUsername(username);
	}

	@Override
	public String getUserIDByUserName(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findUserId(username);
	}

	@Override
	public String deleteUserByID(Long id) {
		if (!registerRepository.existsById(id)) {
			throw new com.backend.elearning.exception.UserNotFoundException(id);
		}
		registerRepository.deleteById(id);
		return "User with id " + id + " has been deleted success.";
	}

	@Override
	public List<User> getAllUsersList() {
		// TODO Auto-generated method stub
		return registerRepository.findAll();
	}

	@Override
	public String getUserFirstName(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findFirstName(username);
	}

	@Override
	public String getUserLastName(String username) {
		// TODO Auto-generated method stub
		return registerRepository.findLastName(username);
	}

}

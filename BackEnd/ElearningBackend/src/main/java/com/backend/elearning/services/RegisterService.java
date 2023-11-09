package com.backend.elearning.services;

import java.util.List;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.Topic;
import com.backend.elearning.models.User;

public interface RegisterService {

	public String register(User reg);	
	public String getUserName(String username);
	public String getPassword(String password);
//	public String getUserDetails(String username);
	public String getUserEmail(String username);
	public Integer getUserRoleId(String username);
	public String getUserRoleName(String username);
	
	public String getUserIDByUserName(String username);
	
	public String deleteUserByID(Long id);	


	public String getUserFirstName(String username);
	public String getUserLastName(String username);

	public List<User> getAllUsersList();
	
}

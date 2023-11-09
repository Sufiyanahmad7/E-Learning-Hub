package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Aproove;
import com.backend.elearning.repositories.AprooveRepository;

@Service
public class ApproveServiceImpl implements ApproveService {

	@Autowired AprooveRepository aprooveRepository; 
	
	@Override
	public List<Aproove> getApproveListByUserID() {
		return aprooveRepository.findAll();
	}

}

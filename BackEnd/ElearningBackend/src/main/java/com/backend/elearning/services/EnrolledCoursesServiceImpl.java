package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.EnrolledCourses;
import com.backend.elearning.repositories.EnrolledCourseRepository;

@Service
public class EnrolledCoursesServiceImpl implements EnrolledCoursesService {

	@Autowired
	private EnrolledCourseRepository enrolledCourseRepository;


	public String saveCourseEnroll(EnrolledCourses course) {
		enrolledCourseRepository.save(course);
		return "Course Enrolled Successfully.";
	}

	@Override
	public List<EnrolledCourses> getEnrollmentByUserID(Long uid) {
		return enrolledCourseRepository.findEnrollmentByUserID(uid);
	}

}

package com.backend.elearning.services;

import java.util.List;

import com.backend.elearning.models.EnrolledCourses;

public interface EnrolledCoursesService {

	public String saveCourseEnroll(EnrolledCourses course);

	public List<EnrolledCourses> getEnrollmentByUserID(Long uid);
	
}

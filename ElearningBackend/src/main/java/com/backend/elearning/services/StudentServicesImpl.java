package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Course;
import com.backend.elearning.repositories.CourseRepository;

@Service
public class StudentServicesImpl implements StudentService {

	@Autowired
	private CourseRepository courseRepository;

	@Override
	public List<Course> getAllCoursesListByCatId(Long id) {
		return courseRepository.courseListByCatId(id);
	}

}

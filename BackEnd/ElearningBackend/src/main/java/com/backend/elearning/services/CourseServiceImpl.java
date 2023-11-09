package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Course;
import com.backend.elearning.repositories.CourseRepository;

@Service
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseRepository courseRepository;

	@Override
	public String deleteCourseByID(Long id) {

		courseRepository.deleteById(id);

		return "User with id " + id + " has been deleted successfully.";
	}

//	@Override
//	public List<Course> getAllCourseList() {
//		return courseRepository.courseList();
//	}

}

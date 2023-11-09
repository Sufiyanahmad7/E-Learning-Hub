package com.backend.elearning.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.Topic;
import com.backend.elearning.repositories.ChapterRepository;
import com.backend.elearning.repositories.CourseRepository;
import com.backend.elearning.repositories.SubtopicRepository;

@Service
public class InstructorServiceImpl implements InstructorService {

	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired
	private ChapterRepository chapterRepository;
	
	@Autowired
	private SubtopicRepository subtopicRepository;
	
	@Override
	public String saveCourse(Course course) {
		courseRepository.save(course);
		return "Course Added Successfully.";
	}

	@Override
	public String saveChapter(Topic chapter) {
		chapterRepository.save(chapter);
		return "Chapter saved successfully";
	}

	@Override
	public String saveSubtopic(SubTopic subtopic) {
		subtopicRepository.save(subtopic);
		return "Subtopic saved successfully";
	}

	@Override
	public List<String> getCoursesListByInstructorID(long id) {
		// TODO Auto-generated method stub
		return courseRepository.courseListByInstructId(id);
	}

	@Override
	public List<String> getChaptersListByCourseID(long id) {
		// TODO Auto-generated method stub
		return chapterRepository.chaptersListByCourseId(id);
	}

	@Override
	public List<Topic> getChapListByCourseID(long courseId) {
		// TODO Auto-generated method stub
		return chapterRepository.chaptListByCourseId(courseId);
	}

	@Override
	public List<String> getSubtopicListByCourseID(long chapterId) {
		// TODO Auto-generated method stub
		return subtopicRepository.subtopicListByChapterId(chapterId);
	}

	

}

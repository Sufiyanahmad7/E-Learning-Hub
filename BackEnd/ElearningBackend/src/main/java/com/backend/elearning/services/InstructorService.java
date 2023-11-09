package com.backend.elearning.services;

import java.util.List;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.SubTopicData;
import com.backend.elearning.models.Topic;

public interface InstructorService {

	//save course
		public String saveCourse(Course course);	
		
		//save chapter
		public String saveChapter(Topic chapter);
		
		//save subtopic
		public String saveSubtopic(SubTopic subtopic);
		

		public List<String> getCoursesListByInstructorID(long id);
		
		public List<String> getChaptersListByCourseID(long id);

		public List<Topic> getChapListByCourseID(long courseId);
		
		public List<String> getSubtopicListByCourseID(long chapterId);
		
}

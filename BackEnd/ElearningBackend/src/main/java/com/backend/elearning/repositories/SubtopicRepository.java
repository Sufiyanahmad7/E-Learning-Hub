package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;

public interface SubtopicRepository  extends JpaRepository<SubTopic, Long> {

	@Query(value = "SELECT subt_id, subt_title, subt_index_no, subt_video_path FROM elearningdb.sub_topic where chapter_chapter_id=?1", nativeQuery = true)
	public List<String> subtopicListByChapterId(long chapterId);

	//chapter_chapter_id, courseid_course_id
	
}

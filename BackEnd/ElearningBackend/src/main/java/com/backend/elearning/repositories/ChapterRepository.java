package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.Topic;

@Repository
public interface ChapterRepository extends JpaRepository<Topic, Long> {

	@Query(value = "SELECT chapter_id, chapter_title FROM elearningdb.chapter where course_course_id=?1", nativeQuery = true)
	public List<String> chaptersListByCourseId(long courseId);

	@Query(value = "SELECT * FROM elearningdb.chapter where course_course_id=?1", nativeQuery = true)
	public List<Topic> chaptListByCourseId(long courseId);

	
}

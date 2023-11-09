package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.CourseData;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	@Query(value = "SELECT course_id, course_title FROM elearningdb.course where user_user_id=?1", nativeQuery = true)
	public List<String> courseListByInstructId(long instructId);

	@Query(value = "SELECT * FROM elearningdb.course where course_category_course_cat_id=?1", nativeQuery = true)
	public List<Course> courseListByCatId(long instructId);

	@Query(value = "SELECT course_id, course_title, course_desc, course_price, course_type  FROM elearningdb.course", nativeQuery = true)
	public List<CourseData> courseList();

	@Query(value = "SELECT count(*) FROM elearningdb.course", nativeQuery = true)
	public String getTotalCourseCount();

	@Query(value = "select count(*) from elearningdb.enroll left join elearningdb.course on enroll.c_id=course.course_id where user_user_id=?1", nativeQuery = true)
	public String getEnrolledCountByInstructorId(Long uid);//getting total enroll students agaist instr course

	@Query(value="select count(*) from elearningdb.course where user_user_id=?1" ,nativeQuery = true)
    public String getCourseCountByInstructorId(Long uid); 
	
	@Query(value = "SELECT count(*) FROM elearningdb.course", nativeQuery = true)
	public String getCourseCount();

	@Query(value = "SELECT course_price FROM elearningdb.course where course_id=?1", nativeQuery = true)
	public Float getPriceCourse(Long uid);
	
	@Query(value = "SELECT user_user_id FROM elearningdb.course where course_id=?1", nativeQuery = true)
	public Long getInstIdCourseId(Long uid);
	
}

package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.EnrolledCourses;

@Repository
public interface EnrolledCourseRepository extends JpaRepository<EnrolledCourses, Long> {
	
	@Query(value = "SELECT * FROM elearningdb.enroll where u_id=?1", nativeQuery = true)
	public List<EnrolledCourses> findEnrollmentByUserID(Long uid);

	@Query(value = "SELECT count(*) FROM elearningdb.enroll where u_id=?1", nativeQuery = true)
	public String findTotalEnrollmentByUserID(Long uid);

}

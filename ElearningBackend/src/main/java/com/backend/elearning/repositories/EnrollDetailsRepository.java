package com.backend.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.EnrollDetails;


@Repository
public interface EnrollDetailsRepository extends JpaRepository<EnrollDetails, Long> {

	@Query(value = "SELECT sum(price) FROM elearningdb.enroll_details where inst_id=?1", nativeQuery = true)
	public Float findTotalRevenue(Long uid);

}

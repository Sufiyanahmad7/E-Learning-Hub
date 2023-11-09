package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.Aproove;



@Repository
public interface AprooveRepository extends JpaRepository<Aproove, Long>{

	@Query(value = "SELECT * FROM elearningdb.aproove", nativeQuery = true)
	public List<Aproove> recordsForAprroveList();

	@Query(value = "SELECT ustatus FROM elearningdb.aproove where user_id=?1", nativeQuery = true)
	public String findUserStatus(Long id);
	
}

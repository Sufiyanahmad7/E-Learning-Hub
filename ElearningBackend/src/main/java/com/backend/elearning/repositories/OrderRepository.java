package com.backend.elearning.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query(value = "SELECT sum(total_amt) FROM elearningdb.orders where user_user_id=?1", nativeQuery = true)
	public String getTotalSumById(Long id);

			
}

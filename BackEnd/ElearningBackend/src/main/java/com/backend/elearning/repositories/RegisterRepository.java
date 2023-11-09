package com.backend.elearning.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.elearning.models.User;


@Repository
public interface RegisterRepository extends JpaRepository<User, Long> {

	@Query(value = "SELECT username FROM elearningdb.users WHERE username = ?1", nativeQuery = true)
	String findByUsername(String username);
	
	@Query(value = "SELECT pass FROM elearningdb.users WHERE username = ?1", nativeQuery = true)
	String findByPassword(String username);

	@Query(value = "SELECT user_id FROM elearningdb.users WHERE username = ?1", nativeQuery = true)
	String findUserId(String username);


	@Query(value = "select first_name from elearningdb.users where username = ?1", nativeQuery = true)
	String findFirstName(String userName);
	
	@Query(value = "select last_name from elearningdb.users where username = ?1", nativeQuery = true)
	String findLastName(String userName);

	@Query(value = "select email from elearningdb.users where username = ?1", nativeQuery = true)
	String findMailByUserName(String userName);
//	
	@Query(value = "select category_id from elearningdb.users where username = ?1", nativeQuery = true)
	Integer findRoleIdbyUsername(String userName);

	@Query(value = "select name from elearningdb.category where id = (select category_id from elearningdb.users where username = ?1)", nativeQuery = true)
	String findRoleNamebyUsername(String userName);


	
	@Query(value = "SELECT * FROM elearningdb.users", nativeQuery = true)
	public List<String> findAllUsers();

	
	@Query(value = "SELECT count(*) FROM elearningdb.users where category_id=?1", nativeQuery = true)
	public String getUserCount(Integer id);

	
	
}

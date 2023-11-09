package com.backend.elearning.models;
import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer ordId;

	@Column(name = "username")
	private String userName;

	@Column(name = "total_amt")
	private Float totalAmt;

	@Column(name = "ord_date")
	private String ordDate;

	@ManyToOne
	private User user;

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Order(Integer uId) {
		super();
		this.ordId = uId;
		// TODO Auto-generated constructor stub
	}

	

	public Order(Integer ordId, String userName, Float totalAmt, String ordDate, User user) {
		super();
		this.ordId = ordId;
		this.userName = userName;
		this.totalAmt = totalAmt;
		this.ordDate = ordDate;
		this.user = user;
	}

	public Integer getOrdId() {
		return ordId;
	}

	public void setOrdId(Integer ordId) {
		this.ordId = ordId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Float getTotalAmt() {
		return totalAmt;
	}

	public void setTotalAmt(Float totalAmt) {
		this.totalAmt = totalAmt;
	}

	public String getOrdDate() {
		return ordDate;
	}

	public void setOrdDate(String ordDate) {
		this.ordDate = ordDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	

}



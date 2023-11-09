package com.backend.elearning.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "enroll_details")
public class EnrollDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long enrollDetailId;

	@Column(name = "course_id")
	private Long cId;

	@Column(name = "price")
	private Float price;

	@Column(name = "inst_id")
	private Long userId;

	public Long getEnrollDetailId() {
		return enrollDetailId;
	}

	public void setEnrollDetailId(Long enrollDetailId) {
		this.enrollDetailId = enrollDetailId;
	}

	public Long getcId() {
		return cId;
	}

	public void setcId(Long cId) {
		this.cId = cId;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "EnrollDetails [enrollDetailId=" + enrollDetailId + ", cId=" + cId + ", price=" + price + ", userId="
				+ userId + "]";
	}
	
	

}

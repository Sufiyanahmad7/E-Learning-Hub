package com.backend.elearning.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "enroll")
public class EnrolledCourses {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long enrollId;

	@Column(name = "uId")
	private Long uId;

	@Column(name = "title")
	private String courseTitle;

	@Column(name = "c_type")
	private String courseType; // paid or free

	@Column(name = "cId")
	private Long cId;

	public Long getEnrollId() {
		return enrollId;
	}

	public void setEnrollId(Long enrollId) {
		this.enrollId = enrollId;
	}

	public String getCourseTitle() {
		return courseTitle;
	}

	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}

	public String getCourseType() {
		return courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

	public Long getuId() {
		return uId;
	}

	public void setuId(Long uId) {
		this.uId = uId;
	}

	public Long getcId() {
		return cId;
	}

	public void setcId(Long cId) {
		this.cId = cId;
	}

}

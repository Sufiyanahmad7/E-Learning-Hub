package com.backend.elearning.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "aproove")
public class Aproove {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long apvId;

	@Column(name = "qualify")
	private String qualification;

	@Column(name = "experience")
	private String exp;

	@Column(name = "certifications")
	private String certi;

	@Column(name = "descr")
	private String desc;
	
	@Column(name = "ustatus")
	private String status;
	
	@Column(name = "user_id")
	private Long uiId;

	

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getUiId() {
		return uiId;
	}

	public void setUiId(Long uiId) {
		this.uiId = uiId;
	}

	public Long getApvId() {
		return apvId;
	}

	public void setApvId(Long apvId) {
		this.apvId = apvId;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getExp() {
		return exp;
	}

	public void setExp(String exp) {
		this.exp = exp;
	}

	public String getCerti() {
		return certi;
	}

	public void setCerti(String certi) {
		this.certi = certi;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

}

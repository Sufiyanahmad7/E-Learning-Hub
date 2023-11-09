package com.backend.elearning.models;

import javax.persistence.Column;
import javax.persistence.ManyToOne;

public class SubTopicData {
	
	private Long subtId;
	private String subtIndexNo;
	private String subtTitle;
	private String subtDesc;
	private String subtThumbPath;
	private String subtFilePath;
	private String subtVideoPath;
	private Long chapterId; //many subtopics belongs to one chapter chapter 
	private Long courseid;
	public Long getSubtId() {
		return subtId;
	}
	public void setSubtId(Long subtId) {
		this.subtId = subtId;
	}
	public String getSubtIndexNo() {
		return subtIndexNo;
	}
	public void setSubtIndexNo(String subtIndexNo) {
		this.subtIndexNo = subtIndexNo;
	}
	public String getSubtTitle() {
		return subtTitle;
	}
	public void setSubtTitle(String subtTitle) {
		this.subtTitle = subtTitle;
	}
	public String getSubtDesc() {
		return subtDesc;
	}
	public void setSubtDesc(String subtDesc) {
		this.subtDesc = subtDesc;
	}
	public String getSubtThumbPath() {
		return subtThumbPath;
	}
	public void setSubtThumbPath(String subtThumbPath) {
		this.subtThumbPath = subtThumbPath;
	}
	public String getSubtFilePath() {
		return subtFilePath;
	}
	public void setSubtFilePath(String subtFilePath) {
		this.subtFilePath = subtFilePath;
	}
	public String getSubtVideoPath() {
		return subtVideoPath;
	}
	public void setSubtVideoPath(String subtVideoPath) {
		this.subtVideoPath = subtVideoPath;
	}
	public Long getChapterId() {
		return chapterId;
	}
	public void setChapterId(Long chapterId) {
		this.chapterId = chapterId;
	}
	public Long getCourseid() {
		return courseid;
	}
	public void setCourseid(Long courseid) {
		this.courseid = courseid;
	} 

	
}

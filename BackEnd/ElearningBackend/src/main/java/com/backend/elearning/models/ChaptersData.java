package com.backend.elearning.models;

import java.util.List;

import javax.persistence.Transient;


public class ChaptersData {

	private Long chapterId;
	private String chapterIndexNo;
	private String chapterTitle;
	private String chapterDesc;
	private String chapterThumbPath;
	private String chapterFilePath;
	private String chapterVideoPath;
	private Long courseId;
	private List<SubTopic> subtopics;
	
	
	private List<SubTopicData> subtpics;

	public List<SubTopicData> getSubtpics() {
		return subtpics;
	}

	public void setSubtpics(List<SubTopicData> subtpics) {
		this.subtpics = subtpics;
	}
	
	public Long getChapterId() {
		return chapterId;
	}
	public void setChapterId(Long chapterId) {
		this.chapterId = chapterId;
	}
	public String getChapterIndexNo() {
		return chapterIndexNo;
	}
	public void setChapterIndexNo(String chapterIndexNo) {
		this.chapterIndexNo = chapterIndexNo;
	}
	public String getChapterTitle() {
		return chapterTitle;
	}
	public void setChapterTitle(String chapterTitle) {
		this.chapterTitle = chapterTitle;
	}
	public String getChapterDesc() {
		return chapterDesc;
	}
	public void setChapterDesc(String chapterDesc) {
		this.chapterDesc = chapterDesc;
	}
	public String getChapterThumbPath() {
		return chapterThumbPath;
	}
	public void setChapterThumbPath(String chapterThumbPath) {
		this.chapterThumbPath = chapterThumbPath;
	}
	public String getChapterFilePath() {
		return chapterFilePath;
	}
	public void setChapterFilePath(String chapterFilePath) {
		this.chapterFilePath = chapterFilePath;
	}
	public String getChapterVideoPath() {
		return chapterVideoPath;
	}
	public void setChapterVideoPath(String chapterVideoPath) {
		this.chapterVideoPath = chapterVideoPath;
	}
	public Long getCourseId() {
		return courseId;
	}
	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}
	public List<SubTopic> getSubtopics() {
		return subtopics;
	}
	public void setSubtopics(List<SubTopic> subtopics) {
		this.subtopics = subtopics;
	}
	
}

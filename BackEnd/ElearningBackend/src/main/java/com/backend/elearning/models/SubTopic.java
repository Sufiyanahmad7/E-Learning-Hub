package com.backend.elearning.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="sub_topic")
public class SubTopic {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long subtId;

	@Column(name = "subt_index_no")
	private String subtIndexNo;

	@Column(name = "subt_title")
	private String subtTitle;

	@Column(name = "subt_desc")
	private String subtDesc;
	
	@Column(name = "subt_thumb_path")
	private String subtThumbPath;
	
	@Column(name = "subt_file_path")
	private String subtFilePath;
	
	
	@Column(name = "subt_video_path")
	private String subtVideoPath;
	
	@ManyToOne
	private Topic chapter; //many subtopics belongs to one chapter chapter 
	
	@ManyToOne
	private Course courseid; //many subtopics belongs to one course  

	public SubTopic() {
		super();
		// TODO Auto-generated constructor stub
	}
	
//	public SubTopic(Long l) {
//		super();
//		this.subtId = l;
//		// TODO Auto-generated constructor stub
//	}
	
	

	public SubTopic(Long subtId, String subtIndexNo, String subtTitle, String subtDesc, String subt_ThumbPath,
			String subtFilePath, String subtVideoPath, Topic chapter, Course courseid) {
		super();
		this.subtId = subtId;
		this.subtIndexNo = subtIndexNo;
		this.subtTitle = subtTitle;
		this.subtDesc = subtDesc;
		this.subtThumbPath = subt_ThumbPath;
		this.subtFilePath = subtFilePath;
		this.subtVideoPath = subtVideoPath;
		this.chapter = chapter;
		this.courseid = courseid;
	}

	
	
	
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

	public String getSubt_ThumbPath() {
		return subtThumbPath;
	}

	public void setSubt_ThumbPath(String subt_ThumbPath) {
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

	public Topic getChapter() {
		return chapter;
	}

	public void setChapter(Topic chapter) {
		this.chapter = chapter;
	}

	public Course getCourseid() {
		return courseid;
	}

	public void setCourseid(Course courseid) {
		this.courseid = courseid;
	}

	@Override
	public String toString() {
		return "SubTopic [subtId=" + subtId + ", subtIndexNo=" + subtIndexNo + ", subtTitle=" + subtTitle
				+ ", subtDesc=" + subtDesc + ", subt_ThumbPath=" + subtThumbPath + ", subtFilePath=" + subtFilePath
				+ ", subtVideoPath=" + subtVideoPath + ", chapter=" + chapter + ", courseid=" + courseid + "]";
	}
	
	
	

	
}

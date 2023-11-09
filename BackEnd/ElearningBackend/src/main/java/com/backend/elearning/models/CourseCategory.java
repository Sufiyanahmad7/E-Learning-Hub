package com.backend.elearning.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table(name="course_category")
public class CourseCategory {

	  @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    private Integer courseCatId;   // 1 , 2 , 3 , 4  

	    private String courseCatName;  //Technology , Business , Health  , Languages
	    
	    
	    // join with course table because one course_category have many courses so there is one to many relation 

	    @OneToMany(mappedBy = "courseCategory")
		private List<Course> cources;

	    
	    
	    
		public CourseCategory() {
			super();
			// TODO Auto-generated constructor stub
		}
		
		public CourseCategory(Integer i) {
			super();
			this.courseCatId = i;
			// TODO Auto-generated constructor stub
		}


		public CourseCategory(Integer courseCatId, String courseCatName, List<Course> cources) {
			super();
			this.courseCatId = courseCatId;
			this.courseCatName = courseCatName;
			this.cources = cources;
		}


		public Integer getCourseCatId() {
			return courseCatId;
		}


		public void setCourseCatId(Integer courseCatId) {
			this.courseCatId = courseCatId;
		}


		public String getCourseCatName() {
			return courseCatName;
		}


		public void setCourseCatName(String courseCatName) {
			this.courseCatName = courseCatName;
		}


		public List<Course> getCources() {
			return cources;
		}


		public void setCources(List<Course> cources) {
			this.cources = cources;
		}


		@Override
		public String toString() {
			return "CourseCategory [courseCatId=" + courseCatId + ", courseCatName=" + courseCatName + ", cources="
					+ cources + "]";
		}

	    
	    
	
}

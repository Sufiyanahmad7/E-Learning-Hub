package com.backend.elearning.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.elearning.fileupload.FileResponce;
import com.backend.elearning.models.ApproveData;
import com.backend.elearning.models.Aproove;
import com.backend.elearning.models.ChaptersData;
import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.SubTopicData;
import com.backend.elearning.models.Topic;
import com.backend.elearning.models.User;
import com.backend.elearning.repositories.AprooveRepository;
import com.backend.elearning.repositories.CourseRepository;
import com.backend.elearning.repositories.EnrollDetailsRepository;
import com.backend.elearning.repositories.EnrolledCourseRepository;
import com.backend.elearning.repositories.OrderRepository;
import com.backend.elearning.repositories.RegisterRepository;
import com.backend.elearning.services.ApproveService;
import com.backend.elearning.services.CourseService;
import com.backend.elearning.services.EmailSenderService;
import com.backend.elearning.services.EnrolledCoursesService;
import com.backend.elearning.services.FileService;
import com.backend.elearning.services.InstructorService;
import com.backend.elearning.services.OrderService;
import com.backend.elearning.services.RegisterService;
import com.backend.elearning.services.StudentService;

@RestController
@RequestMapping("/api/elearning")
public class InstructorController {


	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private FileService fileService;

	@Autowired
	private InstructorService instructorService;

	@Autowired
	private ApproveService approveService;

	@Autowired
	private AprooveRepository aprooveRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private EnrollDetailsRepository enrollDetailsRepository;
	
	@Value("${project.image}")      
	private String path; // getting file path from properties where image will store


	@PostMapping("/addcourse")
	public String addNewCourse(@RequestBody Course course) {
		return instructorService.saveCourse(course);
	}

	@PostMapping("/addchapter")
	public String addNewChapter(@RequestBody Topic chapter) {
		return instructorService.saveChapter(chapter);
	}

	@PostMapping("/addsubtopic")
	public String addNewSubtopic(@RequestBody SubTopic subtopic) {
		return instructorService.saveSubtopic(subtopic);
	}

	@PostMapping("/file/uploadimg")
	public ResponseEntity<FileResponce> uploadFile(@RequestParam("image") MultipartFile image,
			@RequestParam("courseId") Course courseId, @RequestParam("userId") User userId,
			@RequestParam("chapterId") Topic chapterId, @RequestParam("subtId") SubTopic subtId) {
		System.out.println("file moule responce:");
		System.out.println("cid:" + courseId.getCourseId());
//		System.out.println("cid:" + userID);
		System.out.println("file name full:" + image.getOriginalFilename());

		String fileName = null;
//		MultipartFile image = course.getImage();
		try {
			fileName = fileService.uploadImage(path, image, courseId, userId, chapterId, subtId);
			System.out.println("filename: " + image.getName());

			// after upload save file path in respective table(update field value)
			System.out.println("path: " + path);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			return new ResponseEntity<>(new FileResponce(null, "Video could not upload"),
					HttpStatus.INTERNAL_SERVER_ERROR);

		}
		return new ResponseEntity<>(new FileResponce(fileName, "Video is successfully uploaded"), HttpStatus.OK);
	}

	// download image
	/*
	@GetMapping(value = "/download/{imageName}", produces = MediaType.MULTIPART_FORM_DATA_VALUE)
	public void downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response)
			throws IOException {
		System.out.println("in download file");
		InputStream resource = fileService.getResources(path, imageName);
		response.setContentType(MediaType.MULTIPART_FORM_DATA_VALUE);

		StreamUtils.copy(resource, response.getOutputStream());
	}*/

	// ======================== GET LISTS========================================

	@PostMapping("/getcourses")
	public List<String> getCoursesList(@RequestBody User user) {
		System.out.println("id:" + user.getUserId());
		return instructorService.getCoursesListByInstructorID(user.getUserId());
	}

	@PostMapping("/getchapters")
	public List<String> getChaptersList(@RequestBody Course course) {
		System.out.println("id:" + course.getCourseId());
		return instructorService.getChaptersListByCourseID(course.getCourseId());
	}

	@PostMapping("/subtdata/{sId}")
	public List<SubTopicData> getSubtsInCourseBySID(@PathVariable Long sId) {

		List<SubTopicData> stopicList = new ArrayList<SubTopicData>();

//		List<SubTopic> cl = studentService.getAllSubtListByChaptId(sId);

		List<String> stList = instructorService.getSubtopicListByCourseID(sId);

		for (String sbt : stList) {
////		
			SubTopicData stdata = new SubTopicData();
////		

			// split
			String[] arrOfStr = sbt.split(",");

			String id = arrOfStr[0];       // sub-topic Id 
			String tit = arrOfStr[1];      // sub-topic title 
			// String indno = arrOfStr[2];

			stdata.setSubtId(Long.parseLong(id));
			stdata.setSubtTitle(tit);
//		stdata.setSubtIndexNo(indno);
////		stdata.setSubtId(sbt.getSubtId());
////		stdata.setSubtId(sbt.getSubtId());
////		
//		System.out.println(sbt.getSubtTitle());
//		stopicList.add(stopicList );
			stopicList.add(stdata);
////		
		}

//		for (String subt : cl) {
//
//			SubTopicData cd = new SubTopicData();
//
//			cd.setSubtId(subt.getSubtId());
//			cd.setSubtTitle(subt.getSubtTitle());
//			
//
//			cList.add(cd);
//
//			
//			
//		}

		return stopicList;

	}

	// get chapters data for perticular course
	@PostMapping("/chaptersdata/{cId}")
	public List<ChaptersData> getChaptersInCourseByCID(@PathVariable Long cId) {

		List<ChaptersData> cList = new ArrayList<ChaptersData>();

		List<Topic> cl = instructorService.getChapListByCourseID(cId);

		for (Topic ch : cl) {

			ChaptersData cd = new ChaptersData();

			cd.setChapterId(ch.getChapterId());
			cd.setChapterTitle(ch.getChapterTitle());
			cd.setChapterIndexNo(ch.getChapterIndexNo());
			cd.setChapterDesc(ch.getChapterDesc());
			cd.setChapterThumbPath(ch.getChapterThumbPath());
			cd.setChapterFilePath(ch.getChapterFilePath());
			cd.setChapterVideoPath(ch.getChapterVideoPath());
			// cd.setCourseId(ch.getChapterId());

			// set subtopics list
			List<SubTopicData> stopicList = new ArrayList<SubTopicData>();

			List<String> stList = instructorService.getSubtopicListByCourseID(ch.getChapterId());

			System.out.println("chapter" + stList.toString());

			for (String sbt : stList) {
////				
				SubTopicData stdata = new SubTopicData();
////				

				// split
				String[] arrOfStr = sbt.split(",");

				String id = arrOfStr[0];
				String tit = arrOfStr[1];
				String indno = arrOfStr[2];

				stdata.setSubtId(Long.parseLong(id));
				stdata.setSubtTitle(tit);
				stdata.setSubtIndexNo(indno);
////				stdata.setSubtId(sbt.getSubtId());
////				stdata.setSubtId(sbt.getSubtId());
////				
//				System.out.println(sbt.getSubtTitle());
//				stopicList.add(stopicList );
				stopicList.add(stdata);
////				
			}

			cd.setSubtpics(stopicList);

			cList.add(cd);

		}

		return cList;

	}
	// instructor functionality

		@GetMapping("/instruct/totalcourses/{uid}")
		public String getTotalCoursesByInstructId(@PathVariable Long uid) {
			System.out.println("in c count");
			return courseRepository.getCourseCountByInstructorId(uid);
		}

		@GetMapping("/instruct/enroll/{uid}")
		public String getTotalEnrollByInstructId(@PathVariable Long uid) {
			return courseRepository.getEnrolledCountByInstructorId(uid);
		}

//		@GetMapping("/instruct/instruct/earning/{uid}")
//		public String getTotalRevenuByInstructId(@PathVariable Long uid) {
//			System.out.println("in c count");
//			return courseRepository.getCourseCountByInstructorId(uid);
//		}
	//	
		@GetMapping("/revenue/{uid}")
		public Float getTotalRevenuByInstructId(@PathVariable Long uid) {
			System.out.println("revenue: " + uid + " " + orderRepository.getTotalSumById(uid));
			return enrollDetailsRepository.findTotalRevenue(uid);
		}
		@PostMapping("/instructor/getapprove")
		public String getApprove(@RequestBody Aproove approve) {

			aprooveRepository.save(approve);
			return "Your request submitted for approval.";
		}

		// get list of records for approval on admin dash
		@GetMapping("/admin/approve/instructor")
		public List<ApproveData> getApproveList() {
			System.out.println("in call");

			List<ApproveData> cList = new ArrayList<ApproveData>();

			List<Aproove> aList = approveService.getApproveListByUserID();

			for (Aproove apr : aList) {

				ApproveData cd = new ApproveData();

				cd.setApvId(apr.getApvId());
				cd.setCerti(apr.getCerti());
				cd.setDesc(apr.getDesc());
				cd.setQualification(apr.getQualification());
				cd.setExp(apr.getExp()); // course id
				cd.setStatus(apr.getStatus()); // course id
				cd.setUiId(apr.getUiId()); // course id

				cList.add(cd);

			}

			return cList;

		}


}

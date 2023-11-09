package com.backend.elearning.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.CourseByCatIdData;
import com.backend.elearning.models.EnrollDetails;
import com.backend.elearning.models.EnrolledCourseData;
import com.backend.elearning.models.EnrolledCourses;
import com.backend.elearning.models.Order;
import com.backend.elearning.models.OrderData;
import com.backend.elearning.models.User;
import com.backend.elearning.repositories.CourseRepository;
import com.backend.elearning.repositories.EnrollDetailsRepository;
import com.backend.elearning.services.EmailSenderService;
import com.backend.elearning.services.EnrolledCoursesService;
import com.backend.elearning.services.OrderService;
import com.backend.elearning.services.RegisterService;
import com.backend.elearning.services.StudentService;


@RestController
@RequestMapping("/api/elearning")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@Autowired
	private EnrolledCoursesService enrolledCoursesService;

	@Autowired
	private EmailSenderService emailSenderService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private RegisterService registerService;
	
	@Autowired
	private EnrollDetailsRepository enrollDetailsRepository;

	// get course list category wise
		@PostMapping("student/getcourses/{courseCatId}")
		public List<CourseByCatIdData> getCoursesListByCatID(@PathVariable Long courseCatId) {

			List<CourseByCatIdData> cList = new ArrayList<CourseByCatIdData>();

			List<Course> cl = studentService.getAllCoursesListByCatId(courseCatId);

			for (Course course : cl) {

				CourseByCatIdData cd = new CourseByCatIdData();

				cd.setCourseId(course.getCourseId());
				cd.setCourseTitle(course.getCourseTitle());
				cd.setCourseDesc(course.getCourseDesc());
				cd.setCourseType(course.getCourseType());
				cd.setCoursePrice(course.getCoursePrice());
				cd.setCourseCategory(course.getCourseCategory().getCourseCatId());
				cd.setUser(course.getUser().getUserId());
				cd.setIsDisabled(false);

				cList.add(cd);

			}

			return cList;

		}
			// =========== STUDENT FUNCTIONALITY ============================

			// get enrolled courses
			@PostMapping("/student/enrolled/courses/{userId}")
			public List<EnrolledCourseData> getEnrolledCoursesList(@PathVariable Long userId) {

				List<EnrolledCourseData> cList = new ArrayList<EnrolledCourseData>();

				List<EnrolledCourses> cl = enrolledCoursesService.getEnrollmentByUserID(userId);

				for (EnrolledCourses course : cl) {

					EnrolledCourseData cd = new EnrolledCourseData();

					cd.setEnrollId(course.getEnrollId());
					cd.setCourseTitle(course.getCourseTitle());
					cd.setCourseType(course.getCourseType());
					cd.setuId(course.getuId());
					cd.setcId(course.getcId()); // course id

					cList.add(cd);

				}

				return cList;

			}

			// save course enrollment and email
			@PostMapping("/student/enrollment")
			public String saveCourseEnrollment(@RequestBody EnrolledCourses course) {

				// enroll list of courses
				enrolledCoursesService.saveCourseEnroll(course);

				// send email

				return "Course enrolled successfully";

			}

			// ======================== END =================================

			// --------------- instructor functionality ---------------------

			
			// ------------------------- PLACE ORDER ----------------------------------
			@PostMapping("/user/order")
			public String placeOrderDataAndSendMail(@RequestBody OrderData ord) {

				String userId = registerService.getUserIDByUserName(ord.getUserName());
				String userName = ord.getUserName();
				Float total = ord.getTotalAmt();

				String pattern = "dd/MM/yyyy";
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);

				String date = simpleDateFormat.format(new Date());

				Order or = new Order();

				or.setTotalAmt(total);
				or.setUserName(userName);
//				Long uid = Long.parseLong(userId);
				User uss = new User();
				uss.setUserId(Long.parseLong(userId));
				or.setUser(uss);
				or.setOrdDate(date);

				// save order
				orderService.saveOrder(or);

				// list cources
				List<Course> list = ord.getCources();

				String msg = "";

				for (Course el : list) {

					// add list of selected coures to mail
					msg = msg + "" + el.getCourseTitle() + "\t\t" + el.getCoursePrice() + "\n";

					// save db

					// save enrolled course
					// enrolledCoursesService.saveCourseEnroll(null);

					// save order
					EnrolledCourses ec = new EnrolledCourses();

					ec.setCourseTitle(el.getCourseTitle());
					ec.setcId(el.getCourseId());
					ec.setCourseType(el.getCourseType());
					ec.setuId(Long.parseLong(userId));

					// save to db
					enrolledCoursesService.saveCourseEnroll(ec);

					// save to enroll details
					EnrollDetails ed = new EnrollDetails();

					// fetch price by cid
					Float price = courseRepository.getPriceCourse(el.getCourseId());
					ed.setPrice(price);
					ed.setcId(el.getCourseId());

					// fetch instru id for this course
					Long instId = courseRepository.getInstIdCourseId(el.getCourseId());
					ed.setUserId(instId);
					
					System.out.println("Enroll details"+ed.toString());

					enrollDetailsRepository.save(ed);
				}

				// send email functionality
				
				String toEmail = registerService.getUserEmail(userName);
				String fName = registerService.getUserFirstName(userName);
				String lName = registerService.getUserLastName(userName);
				String clientFullName = fName + lName;
				String subject = clientFullName + "-Order(#527)" + userId;
				String billing = "\n------------------------------------------\n" + "Total : " + total;
				String header = "Hello," + "\n\n" + "Your Order Detals" + "\n\n" + "Course Name" + "\t" + "Price"
						+ "\n--------------------------------------\n";

				String footer = "Thanks & Regards," + "\n" + "From @eLearning";

				String body = header + msg + billing + "\n\n" + footer;

				emailSenderService.sendSimpleEmail(toEmail, body, subject);

				return "Email has been send, please check your mailbox.";

			}

		
}

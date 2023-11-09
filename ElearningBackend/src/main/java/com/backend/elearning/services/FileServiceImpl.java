package com.backend.elearning.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.Topic;
import com.backend.elearning.models.User;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file, Course courseId, User userId, Topic chapterId ,SubTopic subtId) throws IOException {

		// renaming
		String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());   // getting extension 
		String cid = courseId.getCourseId().toString();          // getting courseId and converting into string 
		String uid = userId.getUserId().toString();
		String tid = chapterId.getChapterId().toString();
		String sid = subtId.getSubtId().toString();

		// 4 digit random no
		Random rnd = new Random();
		int number = rnd.nextInt(9999);
		String rndno = Integer.toString(number);
		// ----------

		// filename
//		String name = file.getOriginalFilename();

		//String name = file.getName() + "-" + uid + "-" + cid + "-" + tid+"-"+sid+""+"." + extension;
		String name = "vid" + "_" + cid + "-" + tid+"-"+sid+""+"." + extension;

		// fullpath
		String filePath = path + File.separator + name;    

		System.out.println("sep" + File.separator + name + extension);

		// make dir if not exist
		File f = new File(path);

		if (!f.exists()) {
			f.mkdir();
		}

		// copy
		Files.copy(file.getInputStream(), Paths.get(filePath));

		return name;
	}

	@Override
	public String videoUplod(MultipartFile file) throws IllegalStateException, IOException {

		// copy or transfer file to 
		file.transferTo(new File("/ElearningBackend/images" + file.getOriginalFilename()));
		return "video uploaded sucessfully";
	}

	@Override
	public InputStream getResources(String path, String fileName) throws FileNotFoundException {

		String fullPath = path + File.separator + fileName;
		InputStream ips = new FileInputStream(fullPath);

		return ips;
	}

}

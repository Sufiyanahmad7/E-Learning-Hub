package com.backend.elearning.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.backend.elearning.models.Course;
import com.backend.elearning.models.SubTopic;
import com.backend.elearning.models.Topic;
import com.backend.elearning.models.User;

public interface FileService {

	public String uploadImage(String path, MultipartFile file, Course courseId, User userId, Topic chapterId ,SubTopic subtId) throws IOException;

	public String videoUplod(MultipartFile file) throws IllegalStateException, IOException;

	// download resources
	public InputStream getResources(String path, String fileName) throws FileNotFoundException;

}

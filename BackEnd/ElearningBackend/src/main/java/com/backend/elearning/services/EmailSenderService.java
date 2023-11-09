package com.backend.elearning.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {
	

	@Autowired
	private JavaMailSender mailSender;

	public void sendSimpleEmail(String toEmail, String body, String subject) {
		SimpleMailMessage message = new SimpleMailMessage();
		//message.setFrom("johnsp1920@gmail.com");
		message.setFrom("sufiyanahmad91777@gmail.com");   // <-set your email here 
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);

		mailSender.send(message);
		System.out.println("Mail Send...");
	}

}

package com.backend.elearning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.springframework.boot.context.properties.EnableConfigurationProperties;



@SpringBootApplication
public class ElearningBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElearningBackendApplication.class, args);
		System.out.println("App is running fine......");
	}

}

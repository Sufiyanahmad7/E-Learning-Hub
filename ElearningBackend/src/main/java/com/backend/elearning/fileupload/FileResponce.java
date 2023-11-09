package com.backend.elearning.fileupload;

public class FileResponce {

	String filename;
	String message;
	public FileResponce(String filename, String message) {
		super();
		this.filename = filename;
		this.message = message;
	}
	public String getFilename() {
		return filename;
	}
	public void setFilename(String filename) {
		this.filename = filename;
	}
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	
}

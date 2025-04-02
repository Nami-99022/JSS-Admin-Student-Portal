package com.example.adminlogin.service.attendence;

import java.time.LocalDate;
import java.util.List;

import com.example.adminlogin.model.Attendance;

public interface AttendenceService {

	boolean markAttendence(List<Attendance> body);
	
	List<Attendance> fetchStudentAttendence(String semester, Long subjectId, LocalDate startDate, LocalDate endDate);
	
}

package com.example.adminlogin.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adminlogin.model.Attendance;
import com.example.adminlogin.service.attendence.AttendenceService;

@CrossOrigin(origins = "*")
@RequestMapping("/api/attendence")
@RestController
public class AttendanceController {
	
	@Autowired
	AttendenceService attendenceService;
	
	@PostMapping()
	public ResponseEntity<Map<String, String>>  markStudentAttendence(@RequestBody List<Attendance> body){
		
//		if (role != "admin") {
//			return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                    .body("Student are not allowed to save attendence");
//		}
		attendenceService.markAttendence(body);
		Map<String, String> response = new HashMap<>();
	    response.put("message", "Attendance saved successfully");
	    return ResponseEntity.ok(response);
		
	}
	
	@GetMapping("/{semester}")
	public ResponseEntity<Map<Long, List<LocalDate>>> fectchAttendenceInTimeRange(@PathVariable String semester,
			@RequestParam("start") 
	@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate start, @RequestParam("end") 
	@DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate end, @RequestParam Long subject) {
		
		Map<Long, List<LocalDate>> attendanceMap = attendenceService.fetchStudentAttendence(semester, subject, start, end)
				.stream()
				.collect(Collectors.groupingBy(Attendance::getStudentId,Collectors.mapping(Attendance::getAttendenceTime, Collectors.toList())));
		
		return ResponseEntity.status(HttpStatus.OK).body(attendanceMap);
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> throwwxep(RuntimeException ex){
		return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
	}
}

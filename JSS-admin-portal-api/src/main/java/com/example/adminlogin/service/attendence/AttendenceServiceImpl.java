package com.example.adminlogin.service.attendence;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adminlogin.model.Attendance;
import com.example.adminlogin.model.AttendanceStatus;
import com.example.adminlogin.repository.AttendanceRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AttendenceServiceImpl implements AttendenceService {
	@Autowired
	AttendanceRepo attendanceRepo;
	
	@Override
	public boolean markAttendence(List<Attendance> body) {
		// TODO Auto-generated method stub
		try {
			for (Attendance attendance : body) {
				attendanceRepo.save(attendance);	
			}
			return true;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			log.error("Error at attendence save service to repo");
			e.printStackTrace();
			throw new RuntimeException("Error at attendence save service to repo");
		}
	}
	
	@Override
	public List<Attendance> fetchStudentAttendence(String semester, Long subjectId, LocalDate startDate, LocalDate endDate){
		return attendanceRepo.findAttendanceWithinDateRange(semester, subjectId, startDate, endDate, AttendanceStatus.PRESENT);
	}

}

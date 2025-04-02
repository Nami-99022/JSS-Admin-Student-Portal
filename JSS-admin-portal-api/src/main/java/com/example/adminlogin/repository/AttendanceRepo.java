package com.example.adminlogin.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.adminlogin.model.Attendance;
import com.example.adminlogin.model.AttendanceStatus;

@Repository
public interface AttendanceRepo extends JpaRepository<Attendance, Long>{
	
	@Query("SELECT a FROM Attendance a WHERE a.semester = :semester AND a.attendenceStatus = :attendenceStatus AND a.subjectId = :subjectId " +
		       "AND a.attendenceTime BETWEEN :startDate AND :endDate")
		List<Attendance> findAttendanceWithinDateRange(
		    @Param("semester") String semester, 
		    @Param("subjectId") Long subjectId, 
		    @Param("startDate") LocalDate startDate, 
		    @Param("endDate") LocalDate endDate,
		    @Param("attendenceStatus") AttendanceStatus attendenceStatus );
}

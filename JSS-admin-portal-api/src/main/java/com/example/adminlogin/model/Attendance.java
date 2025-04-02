package com.example.adminlogin.model;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity
@Table(name = "attendance")
public class Attendance {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendenceId;
	
	private String semester;
	
	private Long subjectId;
	
	private Long studentId;
	
	@Temporal(TemporalType.DATE)
	private LocalDate attendenceTime;
	
	@Enumerated(EnumType.ORDINAL)
	private AttendanceStatus attendenceStatus;
}



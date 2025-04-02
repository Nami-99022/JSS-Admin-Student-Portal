import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../staff.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Ensure this is 'styleUrls' (plural)
})
export class HomeComponent implements OnInit {
  staffMembers: any[] = [];

  constructor(private router: Router, private staffService: StaffService) {}

  ngOnInit() {
    this.fetchStaffData();
  }

  fetchStaffData() {
    this.staffService.getStaffData().subscribe(
      (data: any) => {
        this.staffMembers = data;
      },
      (error) => {
        console.error('Error fetching staff data:', error);
      }
    );
  }
  newAttendancemanagement() {
    this.router.navigate(['/sidemenu/new-attendance-management']);
  }
  home() {
    this.router.navigate(['/sidemenu/home']);
  }

  timetable() {
    this.router.navigate(['/sidemenu/time-table']);
  }

  studentsmanagement() {
    this.router.navigate(['/sidemenu/students-management']);
  }

  attendancemanagement() {
    this.router.navigate(['/sidemenu/attendance-management']);
  }

  questionbank() {
    this.router.navigate(['/sidemenu/question-bank']);
  }

  iamodule() {
    this.router.navigate(['/sidemenu/ia-module']);
  }

  feedbacksystem() {
    this.router.navigate(['/sidemenu/feedback-system']);
  }

  lessonplan() {
    this.router.navigate(['/sidemenu/lesson-plan']);
  }

  teachingaids() {
    this.router.navigate(['/sidemenu/teaching-aids']);
  }

  personaldocuments() {
    this.router.navigate(['/sidemenu/personal-documents']);
  }

  staffmanagement() {
    this.router.navigate(['/sidemenu/staff-management']);
  }

  subjectmanagement() {
    this.router.navigate(['/sidemenu/subject-management']);
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }
}

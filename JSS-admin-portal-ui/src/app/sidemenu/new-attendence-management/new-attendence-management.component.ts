import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../subject-management/subject-management.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { format, addDays } from 'date-fns';

@Component({
  selector: 'app-new-attendence-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-attendence-management.component.html',
  styleUrl: './new-attendence-management.component.css',
})
export class NewAttendenceManagementComponent {
  getAttendence() {
    console.log(this.selectedStartDate);
    console.log(this.selectedEndDate);

    let params1 = new HttpParams();
    params1 = params1.append('subject', this.selectedSubjectInModal);
    params1 = params1.append('start', this.selectedStartDate);
    params1 = params1.append('end', this.selectedEndDate);

    this.http
      .get(
        `http://localhost:8080/api/attendence/${this.selectedSemesterInModal}`,
        { params: params1 }
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          alert('error');
        },
      });

    this.generateDates();
    this.initializeAttendance();

    console.log(this.dateHeaders);
    console.log(this.attendanceMap);
  }
  updateAttendence() {
    console.log(this.semStudents);
    let body = this.semStudents.map(({ studentId, attendenceStatus }) => ({
      studentId,
      attendenceStatus,
      semester: this.selectedSemester,
      subjectId: this.selectedSubject,
      attendenceTime: this.selectedDate,
    }));
    console.log(body);
    this.http.post('http://localhost:8080/api/attendence', body).subscribe({
      next: () => {
        alert('Success');
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error uploading attendence');
      },
    });
  }
  subjects: Subject[] = [];
  loadingSubjects: boolean = false;
  selectedSubject: number = 0;
  errorMessage: string = ``;
  selectedMonth: string = ``;
  selectedMonthInModal: string = ``;
  selectedSubjectInModal: string = ``;
  subjectsInModal: Subject[] = [];
  loadingSubjectsInModal: boolean = false;
  selectedDate: any;
  selectedStartDate: any;
  selectedEndDate: any;
  semStudents: {
    studentId: Number;
    userName: String;
    attendenceStatus: AttendanceStatus;
  }[] = [];
  semStudentsInModal: { studentId: number; userName: string }[] = [];
  constructor(private router: Router, private http: HttpClient) {}

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
  newAttendancemanagement() {
    this.router.navigate(['/sidemenu/new-attendance-management']);
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
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
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

  selectedSemester: string = '';
  selectedDocumentCategory: string = 'QuestionBank';
  selectedSemesterInModal: string = '';
  fileToUpload: File | null = null;
  showModal: boolean = false;
  questionBankDocuments: any[] = [];
  semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
  selectedDocumentType = 'pdf';
  uploadDate: Date = new Date();
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  viewQuestionBank() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  statuses = ['ABSENT', 'PRESENT'];

  onSemesterChange() {
    if (!this.selectedSemester) {
      this.subjects = [];
      return;
    }

    this.loadingSubjects = true;
    this.selectedSubject = 0;
    this.subjects = [];

    this.http
      .get<Subject[]>(
        `http://localhost:8080/api/subjects/semester/${this.selectedSemester.charAt(
          this.selectedSemester.length - 1
        )}`
      )
      .subscribe({
        next: (data) => {
          this.subjects = data;
          this.loadingSubjects = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading subjects';
          this.loadingSubjects = false;
        },
      });

    this.semStudents = [];

    this.http
      .get<{ id: Number; userName: String }[]>(
        `http://localhost:8080/users/studentnew/${this.selectedSemester}`
      )
      .subscribe({
        next: (data) => {
          let tmp = data.map(({ id, userName }) => ({
            studentId: id,
            userName,
          }));
          this.semStudents = tmp.map((users) => ({
            ...users,
            attendenceStatus: AttendanceStatus.ABSENT,
          }));
        },
        error: (error) => {},
      });
  }

  onSemesterChangeInModal() {
    if (!this.selectedSemesterInModal) {
      this.subjectsInModal = [];
      return;
    }

    this.loadingSubjectsInModal = true;
    this.selectedSubjectInModal = '';
    this.subjectsInModal = [];

    this.http
      .get<Subject[]>(
        `http://localhost:8080/api/subjects/semester/${this.selectedSemesterInModal.charAt(
          this.selectedSemesterInModal.length - 1
        )}`
      )
      .subscribe({
        next: (data) => {
          this.subjectsInModal = data;
          this.loadingSubjectsInModal = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading subjects';
          this.loadingSubjects = false;
        },
      });

    this.semStudentsInModal = [];
    this.http
      .get<{ studentId: number; userName: string }[]>(
        `http://localhost:8080/users/studentnew/${this.selectedSemester}`
      )
      .subscribe({
        next: (data) => {
          this.semStudentsInModal = data.map(({ studentId, userName }) => ({
            studentId,
            userName,
          }));
        },
        error: (error) => {},
      });
  }

  dateHeaders: string[] = [];
  attendanceMap: { [studentId: number]: AttendanceRecord } = {};

  generateDates() {
    this.dateHeaders = [];
    let currentDate = new Date(this.selectedStartDate);

    while (currentDate <= this.selectedEndDate) {
      this.dateHeaders.push(format(currentDate, 'yyyy-MM-dd')); // YYYY-MM-DD
      currentDate = addDays(currentDate, 1);
    }
  }

  initializeAttendance() {
    this.semStudentsInModal.forEach((student) => {
      this.attendanceMap[student.studentId] = {};
      this.dateHeaders.forEach((date) => {
        this.attendanceMap[student.studentId][date] = AttendanceStatus.ABSENT; // Default Absent
      });
    });
  }
}
export enum AttendanceStatus {
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
}

interface AttendanceRecord {
  [date: string]: AttendanceStatus;
}

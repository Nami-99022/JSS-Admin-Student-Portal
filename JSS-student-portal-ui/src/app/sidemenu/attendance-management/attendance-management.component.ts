import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-management.component.html',
  styleUrl: './attendance-management.component.css',
})
export class AttendanceManagementComponent {
  constructor(private router: Router, private http: HttpClient) {}

  home() {
    this.router.navigate(['/sidemenu/home']);
  }
  timetable() {
    this.router.navigate(['/sidemenu/time-table']);
  }
  // studentsmanagement(){
  //   this.router.navigate(['/sidemenu/students-management']);
  // }
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
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('Semester');
    this.router.navigate(['/auth/login']);
  }

  lessonplandocuments: any[] = [];
  selectedDocumentCategory: string = 'QuestionBank';
  selectedSemester: string | null = null;

  ngOnInit(): void {
    this.selectedSemester = localStorage.getItem('Semester') || null;

    console.log('Selected Semester from Local Storage:', this.selectedSemester);

    if (this.selectedSemester) {
      this.getDocumentsBySemester();
    } else {
      alert('Semester not found in local storage!');
    }
  }

  getDocumentsBySemester() {
    if (this.selectedSemester) {
      // Construct the API URL using the selected semester and category
      const url = `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemester}`;

      // Make the HTTP GET request to fetch documents
      this.http.get<any[]>(url).subscribe({
        next: (documents) => {
          console.log('Fetched Documents:', documents);
          this.lessonplandocuments = documents; // Store the fetched documents in the array
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
          alert('Error fetching documents'); // Show an alert on error
        },
      });
    } else {
      alert('The student is missing Sem data');
    }
  }

  getDownloadLink(semester: string, fileName: string): string {
    return `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;
  }
}

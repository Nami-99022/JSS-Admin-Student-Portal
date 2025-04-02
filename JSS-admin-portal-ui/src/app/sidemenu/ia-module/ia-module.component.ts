import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpEventType,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Subject {
  id?: number;
  semester: string;
  subject: string;
  subjectCode: string;
  fileName?: string;
  uploadedDate?: string;
}
@Component({
  selector: 'app-ia-module',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './ia-module.component.html',
  styleUrl: './ia-module.component.css',
})
export class IAModuleComponent implements OnInit {
  selectedSemesterInModal: string = ``;
  selectedDocumentCategory: string = `IABank`;
  selectedSubjectInModal: string = ``;
  subjectsInModal: Subject[] = [];
  iaBankDocuments: any[] = [];
  loadingSubjectsInModal: boolean = false;

  closeModal() {
    this.showModal = false;
  }
  showModal: boolean = false;

  viewIADoc() {
    this.showModal = true;
  }
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
  newAttendancemanagement() {
    this.router.navigate(['/sidemenu/new-attendance-management']);
  }
  personaldocuments() {
    this.router.navigate(['/sidemenu/personal-documents']);
  }
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }
  staffmanagement() {
    this.router.navigate(['/sidemenu/staff-management']);
  }

  subjectmanagement() {
    this.router.navigate(['/sidemenu/subject-management']);
  }

  semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
  subjects: Subject[] = [];
  selectedSemester: string = '';
  selectedSubject: string = '';
  selectedFile: File | null = null;

  loadingSemesters = false;
  loadingSubjects = false;
  submitting = false;
  uploadProgress = 0;
  uploadSuccess = false;
  errorMessage = '';

  // Assuming you have the user ID from your authentication system
  userId = 1; // Replace with actual user ID from your auth system

  private baseUrl = 'http://localhost:8080/api/subjects';

  // constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.loadSemesters();
  }

  // loadSemesters() {
  //   this.loadingSemesters = true;
  //   this.http.get<string[]>(`${this.baseUrl}/semesters`).subscribe({
  //     next: (data) => {
  //       this.semesters = data;
  //       this.loadingSemesters = false;
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Error loading semesters';
  //       this.loadingSemesters = false;
  //     },
  //   });
  // }

  onSemesterChange() {
    if (!this.selectedSemester) {
      this.subjects = [];
      return;
    }

    this.loadingSubjects = true;
    this.selectedSubject = '';
    this.subjects = [];

    this.http
      .get<Subject[]>(
        `${this.baseUrl}/semester/${this.selectedSemester.charAt(
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
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadProgress = 0;
      this.uploadSuccess = false;
      this.errorMessage = '';
    }
  }

  onSubmit() {
    // if (!this.selectedFile || !this.selectedSubject) {
    //   this.errorMessage = 'Please fill in all required fields';
    //   return;
    // }

    // const formData = new FormData();
    // formData.append('file', this.selectedFile);
    // formData.append('fileName', this.selectedFile.name);
    // formData.append('subjectId', this.selectedSubject);
    // formData.append('userId', this.userId.toString());

    // this.submitting = true;
    // this.errorMessage = '';
    // this.uploadSuccess = false;

    // this.http
    //   .post(`${this.baseUrl}/upload-ia-marks`, formData, {
    //     reportProgress: true,
    //     observe: 'events',
    //   })
    //   .subscribe({
    //     next: (event: any) => {
    //       if (event.type === HttpEventType.UploadProgress) {
    //         this.uploadProgress = Math.round(
    //           (100 * event.loaded) / event.total
    //         );
    //       } else if (event instanceof HttpResponse) {
    //         this.uploadSuccess = true;
    //         this.submitting = false;
    //         this.resetForm();
    //       }
    //     },
    //     error: (error) => {
    //       this.errorMessage =
    //         'Error uploading file: ' +
    //         (error.error?.message || 'Unknown error');
    //       this.submitting = false;
    //       this.uploadProgress = 0;
    //     },
    //   });

    if (
      this.selectedFile &&
      this.selectedSemester &&
      this.selectedDocumentCategory &&
      this.selectedSubject
    ) {
      const formData = new FormData();
      const fileType = this.selectedFile.name.split('.').pop()?.toLowerCase();
      formData.append('file', this.selectedFile);
      formData.append('fileName', this.selectedFile.name);
      formData.append('semester', this.selectedSemester);
      formData.append('documentCategory', this.selectedDocumentCategory);
      formData.append('documentType', 'genral');
      formData.append('fileType', fileType || 'unknown');
      formData.append('uploadDate', new Date().toISOString());
      formData.append('userEmail', 'admin@example.com');
      formData.append('month', 'January');
      formData.append('subject', this.selectedSubject);

      this.http
        .post<any>('http://localhost:8080/api/alldocuments/upload', formData)
        .subscribe({
          next: (response) => {
            this.resetForm();
            alert('File uploaded successfully');
          },
          error: (error) => {
            alert('Error uploading file');
          },
        });
    } else {
      alert('Please select a file, semester, month and subject');
    }
  }

  resetForm() {
    this.selectedSemester = '';
    this.selectedSubject = '';
    this.selectedFile = null;
    this.subjects = [];
    this.uploadProgress = 0;
  }

  getFileQuery() {
    let params = new HttpParams();
    if (this.selectedSemesterInModal && this.selectedSubjectInModal) {
      params = params.append('subject', this.selectedSubjectInModal);

      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.iaBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal) {
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.iaBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    }
  }

  onSemesterChangeInModal() {
    if (!this.selectedSemesterInModal) {
      this.subjectsInModal = [];
      return;
    }

    this.loadingSubjectsInModal = true;
    this.selectedSubjectInModal = '';
    this.subjectsInModal = [];
    let params = new HttpParams();
    params = params.append('category', this.selectedDocumentCategory);
    this.http
      .get<Subject[]>(
        `http://localhost:8080/api/alldocuments/semester/${this.selectedSemesterInModal}`,
        { params: params }
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
  }

  getDownloadLink(semester: string, fileName: string): string {
    return `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;
  }

  deleteFile(semester: string, fileName: string): void {
    const url = `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;

    this.http.delete(url).subscribe({
      next: (response) => {
        this.getFileQuery();
        alert('File deleted successfully');
      },
      error: (error) => {
        alert('Error deletings file');
      },
    });
  }
}

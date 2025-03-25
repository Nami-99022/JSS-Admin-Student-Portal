import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subject } from '../subject-management/subject-management.component';

export interface Document {
  docId?: number;
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
  semester: string;
  documentCategory: string;
  documentPath: string;
}

@Component({
  selector: 'app-attendance-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './attendance-management.component.html',
  styleUrl: './attendance-management.component.css',
})
export class AttendanceManagementComponent {
  subjects: Subject[] = [];
  loadingSubjects: boolean = false;
  selectedSubject: string = ``;
  errorMessage: string = ``;
  selectedMonth: string = ``;
  selectedMonthInModal: string = ``;
  selectedSubjectInModal: string = ``;
  subjectsInModal: Subject[] = [];
  loadingSubjectsInModal: boolean = false;
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

  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  uploadFile() {
    if (
      this.fileToUpload &&
      this.selectedSemester &&
      this.selectedDocumentCategory &&
      this.selectedMonth &&
      this.selectedSubject
    ) {
      const formData = new FormData();
      const fileType = this.fileToUpload.name.split('.').pop()?.toLowerCase();
      formData.append('file', this.fileToUpload);
      formData.append('fileName', this.fileToUpload.name);
      formData.append('semester', this.selectedSemester);
      formData.append('documentCategory', this.selectedDocumentCategory);
      formData.append('documentType', this.selectedDocumentType);
      formData.append('fileType', fileType || 'unknown');
      formData.append('uploadDate', this.uploadDate.toISOString());
      formData.append('userEmail', 'admin@example.com');
      formData.append('month', this.selectedMonth);
      formData.append('subject', this.selectedSubject);

      this.http
        .post<any>('http://localhost:8080/api/alldocuments/upload', formData)
        .subscribe({
          next: (response) => {
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

  // openFile(doc: any) {
  //   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  //   const fileType = doc.fileName.split('.').pop()?.toLowerCase();
  //   const viewUrl = `http://localhost:8080/api/alldocuments/viewFile/${doc.semester}/${doc.fileName}`;

  //   if (!isAuthenticated) {
  //     alert('You are not logged in. Please log in to access your files.');
  //     return;
  //   }

  //   if (
  //     fileType === 'txt' ||
  //     fileType === 'json' ||
  //     fileType === 'pdf' ||
  //     ['jpg', 'jpeg', 'png', 'gif'].includes(fileType)
  //   ) {
  //     window.open(viewUrl, '_blank');
  //   } else if (['doc', 'docx'].includes(fileType)) {
  //     const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
  //       viewUrl
  //     )}`;
  //     window.open(officeOnlineUrl, '_blank');
  //   } else if (['xls', 'xlsx'].includes(fileType)) {
  //     const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
  //       viewUrl
  //     )}`;
  //     window.open(officeOnlineUrl, '_blank');
  //   } else if (['ppt', 'pptx'].includes(fileType)) {
  //     const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
  //       viewUrl
  //     )}`;
  //     window.open(officeOnlineUrl, '_blank');
  //   } else {
  //     alert('This file type is not supported for viewing.');
  //   }
  // }

  viewQuestionBank() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getDocumentsBySemester() {
    if (this.selectedSemesterInModal) {
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    }
  }

  viewTextFile(doc: any) {
    this.http
      .get(doc.downloadUrl, { responseType: 'text' })
      .subscribe((content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      });
  }

  viewPdf(doc: any) {
    window.open(doc.downloadUrl, '_blank');
  }

  viewImage(doc: any) {
    window.open(doc.downloadUrl, '_blank');
  }

  // downloadFile(filename: string) {
  //   const url = `http://localhost:8080/viewFile/sem1/${filename}`;
  //   const fileType = filename.split('.').pop()?.toLowerCase(); // Get file type
  //   const headers = {
  //     Accept:
  //       fileType === 'pdf' ? 'application/pdf' : 'application/octet-stream',
  //   };

  //   this.http.get(url, { responseType: 'blob', headers: headers }).subscribe(
  //     (response) => {
  //       const blob = new Blob([response], { type: `application/${fileType}` });
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = filename;
  //       link.click();
  //     },
  //     (error) => {
  //       console.error('Download failed', error);
  //     }
  //   );
  // }

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
  getDownloadLink(semester: string, fileName: string): string {
    return `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;
  }

  getFileQuery() {
    let params = new HttpParams();
    if (
      this.selectedSemesterInModal &&
      this.selectedMonthInModal &&
      this.selectedSubjectInModal
    ) {
      params = params.append('month', this.selectedMonthInModal);
      params = params.append('subject', this.selectedSubjectInModal);
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal && this.selectedMonthInModal) {
      params = params.append('month', this.selectedMonthInModal);
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal && this.selectedSubjectInModal) {
      params = params.append('subject', this.selectedSubjectInModal);

      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
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
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    }
  }

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
}

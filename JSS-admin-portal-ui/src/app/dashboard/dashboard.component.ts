import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';


interface Document {
  docId?: number;
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
}

interface UploadResponse {
  message?: string;
  error?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  baseUrl = 'http://localhost:8080/api/files';
  fileList: Document[] = [];
  selectedFileName = '';
  selectedDocumentType = '';

  sidebarLinks = [
    { name: 'Home', route: '/home', icon: 'bi bi-house', action: () => this.home() },
    { name: 'Time Table', route: '/time-table', icon: 'bi bi-calendar3', action: () => this.timetable() },
    { name: 'Students Management', route: '/students-management', icon: 'bi bi-person-workspace', action: () => this.studentsmanagement() },
    { name: 'Attendance Management', route: '/attendance-management', icon: 'bi bi-check-square', action: () => this.attendancemanagement() },
    { name: 'Question Bank', route: '/question-bank', icon: 'bi bi-book', action: () => this.questionbank() },
    { name: 'IA Module', route: '/ia-module', icon: 'bi bi-card-list', action: () => this.iamodule() },
    { name: 'Feedback System', route: '/feedback-system', icon: 'bi bi-chat-dots', action: () => this.feedbacksystem() },
    { name: 'Lesson Plan', route: '/lesson-plan', icon: 'bi bi-file-earmark-text', action: () => this.lessonplan() },
    { name: 'Teaching Aids', route: '/teaching-aids', icon: 'bi bi-easel', action: () => this.teachingaids() },
    { name: 'Personal Documents', route: '/personal-documents', icon: 'bi bi-folder', action: () => this.personaldocuments() },
    { name: 'Logout', route: '/login', icon: 'bi bi-box-arrow-right', action: () => this.logout() }
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getFileList();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        const documentType = this.selectedDocumentType; 
        const documentName = file.name; 
        const documentTypeMapping = this.getFileType(file); 

        if (this.isFileTypeValid(documentType, documentTypeMapping)) {
            if (documentTypeMapping) {
                this.uploadFile(file, documentType, documentName, documentTypeMapping).subscribe(
                    (response: UploadResponse) => {
                        if (response && response.error) {
                            alert(response.error); 
                            return; 
                        }
                        alert('File uploaded successfully');
                        this.getFileList(); // Refresh the file list instead of pushing manually
                    },
                    error => {
                        if (error.status === 409) {
                            alert('File already exists with the same name');
                        } else {
                            console.error('Error uploading file:', error);
                        }
                    }
                );
            } else {
                alert('Invalid file type. Please select a valid file.');
            }
        } else {
            alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
        }
    } else {
        alert('Please select a document type and file to upload.');
    }
}



  isFileTypeValid(selectedType: string, fileType: string | null): boolean {
    if (!fileType) return false;
    const validTypes: { [key: string]: string[] } = {
      pdf: ['application/pdf'],
      excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      word: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      image: ['image/jpeg', 'image/png'],
      ppt: ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
    };
    return validTypes[selectedType]?.includes(fileType) ?? false;
  }

  uploadFile(file: File, documentType: string, fileName: string, fileType: string): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    formData.append('uploadDate', new Date().toISOString());

    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
        formData.append('userId', loginUser);
        console.log('Uploading with:', { file, documentType, fileName, fileType, uploadDate: new Date().toISOString(), userId: loginUser });
        return this.http.post(`${this.baseUrl}/upload`, formData);
    } else {
        console.error('No logged-in user found.');
        return of({ error: 'No logged-in user found.' });
    }
}


  onFileSelect() {
    console.log('Selected file:', this.selectedFileName);
  }

  getFileType(file: File): string {
    if (file.type.includes('pdf')) {
      return 'application/pdf';
    } else if (file.type.includes('image')) {
      return 'image/jpeg'; // Adjust according to your requirements
    } else if (file.type.includes('excel')) {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (file.type.includes('word')) {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (file.type.includes('ppt')) {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    return ''; // Return an empty string instead of null
  }

  getFileList() {
    this.http.get<Document[]>(`${this.baseUrl}/list`).subscribe(
      fileList => {
        this.fileList = fileList;
      },
      error => {
        console.error('Error fetching file list:', error);
        alert('Error fetching file list: ' + error.message);
      }
    );
  }
  downloadSelectedFile() {
    if (this.selectedFileName) {
      const downloadUrl = `${this.baseUrl}/download/${this.selectedFileName}`;
      this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.selectedFileName;
        a.click();
      });
    } else {
      alert('Please select a file to download');
    }
  }

//   deleteFile(fileName: string) {
//     if (fileName) {
//         if (confirm(`Are you sure you want to delete ${fileName}?`)) {
//             this.http.delete(`${this.baseUrl}/delete/${fileName}`).subscribe(() => {
//                 alert(`${fileName} deleted successfully`);
//                 this.getFileList();
//             }, error => {
//                 console.error('Error deleting file:', error);
//                 alert('Error deleting file: ' + error.message);
//             });
//         }
//     } else {
//         alert('Please select a file to delete');
//     }
// }

  // Sidebar navigation methods
  home() { this.router.navigate(['/home']); }
  timetable() { this.router.navigate(['/time-table']); }
  studentsmanagement() { this.router.navigate(['/students-management']); }
  attendancemanagement() { this.router.navigate(['/attendance-management']); }
  questionbank() { this.router.navigate(['/question-bank']); }
  iamodule() { this.router.navigate(['/ia-module']); }
  feedbacksystem() { this.router.navigate(['/feedback-system']); }
  lessonplan() { this.router.navigate(['/lesson-plan']); }
  teachingaids() { this.router.navigate(['/teaching-aids']); }
  personaldocuments() { this.router.navigate(['/personal-documents']); }
  logout() { localStorage.clear(); this.router.navigate(['/login']); }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
 

   

  home(){
    this.router.navigate(['/sidemenu/home']);

  }
  timetable(){
    this.router.navigate(['/sidemenu/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/sidemenu/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/sidemenu/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/sidemenu/ia-module']);
    }

    feedbacksystem(){
      this.router.navigate(['/sidemenu/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/sidemenu/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/sidemenu/teaching-aids']);
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      this.router.navigate(['/sidemenu/personal-documents'])
    }
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }


    semesters = [1, 2, 3, 4, 5, 6];
    days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    timeSlots = [
      '9.00 TO 10.00 am', '10.00 TO 11.00 am', '11.00 TO 12.00 pm',
      '12.00 Tpm TO 1.00 pm', '1.00 to 2.00 PM', '2.00 to 3.00 PM', '3.00 tp 4.00 PM'
    ];
    showModal: boolean = false;
    selectedSemester: string = 'all';
    isTimetableVisible: boolean = true;
    selectedFile: File | null = null;
    filteredTimetable: any;
    
    semesterTimetable: any = {
      1: {
              MONDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FEEE (THEORY)' },
              TUESDAY: { '11.00 TO 12.00 pm': 'FEEE Lab B1 / IT skill Lab B2', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
              WEDNESDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'EM', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
              THURSDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '3.00 tp 4.00 PM': 'NSS / NCC / REDCROSS' },
              FRIDAY: { '9.00 TO 10.00 am': 'FEEE Lab B1 / IT skill Lab B2', '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FEEE (THEORY)', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FOC' },
              SATURDAY: { '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FOC' }
            },
            3: {
              MONDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'DBMS LAB', '12.00 Tpm TO 1.00 pm': 'DBMS LAB', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
              TUESDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN', '12.00 Tpm TO 1.00 pm': 'PYTHON', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
              WEDNESDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'PYTHON' },
              THURSDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'CN LAB', '12.00 Tpm TO 1.00 pm': 'CN LAB', '2.00 to 3.00 PM': 'NSS/ NCC/ REDCROSS' },
              FRIDAY: { '9.00 TO 10.00 am': 'CN', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'DBMS' },
              SATURDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN LAB' },
            },
            
              5: {
                MONDAY: {
                  "9.00 TO 10.00 am": "FSD (P)",
                  "10.00 TO 11.00 am": "FSD (P)",
                  "11.00 TO 12.00 pm": "FSD (L)",
                  "12.00 Tpm TO 1.00 pm": "FSD (L)",
                  "1.00 to 2.00 PM": "LUNCH BREAK",
                  "2.00 to 3.00 PM": "FSD (L+P)",
                  "3.00 tp 4.00 PM": "FSD (L+P)"
                },
                TUESDAY: {
                  "9.00 TO 10.00 am": "FSD (P)",
                  "10.00 TO 11.00 am": "FSD (P)",
                  "11.00 TO 12.00 pm": "FSD (L)",
                  "12.00 Tpm TO 1.00 pm": "FSD (L)",
                  "1.00 to 2.00 PM": "",
                  "2.00 to 3.00 PM": "FSD (L+P)",
                  "3.00 tp 4.00 PM": "FSD (L+P)"
                },
                WEDNESDAY: {
                  "9.00 TO 10.00 am": "FSD (P)",
                  "10.00 TO 11.00 am": "FSD (P)",
                  "11.00 TO 12.00 pm": "FSD (L)",
                  "12.00 Tpm TO 1.00 pm": "FSD (L)",
                  "1.00 to 2.00 PM": "",
                  "2.00 to 3.00 PM": "FSD (L+P)",
                  "3.00 tp 4.00 PM": "FSD (L+P)"
                },
                THURSDAY: {
                  "9.00 TO 10.00 am": "FSD (P)",
                  "10.00 TO 11.00 am": "FSD (P)",
                  "11.00 TO 12.00 pm": "FSD (L)",
                  "12.00 Tpm TO 1.00 pm": "FSD (L)",
                  "1.00 to 2.00 PM": "",
                  "2.00 to 3.00 PM": "NSS/ NCC/ REDCROSS"
                },
                FRIDAY: {
                  "9.00 TO 10.00 am": "Assessment / CIE",
                  "10.00 TO 11.00 am": "",
                  "11.00 TO 12.00 pm": "Assessment / CIE",
                  "12.00 Tpm TO 1.00 pm": "",
                  "1.00 to 2.00 PM": "Assessment / CIE"
                },
                SATURDAY: {
                  "9.00 TO 10.00 am": "Industry / Seminar",
                  "10.00 TO 11.00 am": "",
                  "11.00 TO 12.00 pm": "Industry / Seminar"
                }
              }
            
       
    };
    
   
    showPopup = false;
  selectedSemester1: string = '';
  fileToUpload: File | null = null;
  documentType: string = 'Excel';
  fileName: string = '';
  fileType: string = 'xlsx';
  uploadDate: Date = new Date(); 
  userEmail: string = 'admin@example.com'; 
  documentCategory: string = 'Time-Table';
  documentPath: string='';

  semesters1 = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];

  // Define API URL here
  private apiUrl = 'http://localhost:8080/api/alldocuments/upload'; // Adjust URL as necessary

  constructor(private http: HttpClient,private router: Router) {}

  // Open the upload popup
  openUploadPopup() {
    this.showPopup = true;
  }

  // Close the upload popup
  closePopup() {
    this.showPopup = false;
  }

  // Handle file selection
  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  // Upload timetable to backend
  // uploadTimetable() {
  //   if (this.fileToUpload) {
  //     const formData = new FormData();
  //     formData.append('file', this.fileToUpload);
  //     formData.append('documentType', this.documentType);
  //     formData.append('fileName', this.fileName);
  //     formData.append('fileType', this.fileType);
  //     formData.append('uploadDate', this.uploadDate.toISOString());
  //     formData.append('userEmail', this.userEmail);
  //     formData.append('semester', this.selectedSemester1);
  //     formData.append('documentCategory', this.documentCategory);
  //     formData.append('documentPath', this.documentPath);

  //     this.http.post<any>(this.apiUrl, formData).subscribe(response => {
  //       console.log('File uploaded successfully:', response);
  //       alert('File uploaded successfully!');
  //       this.closePopup(); // Close the popup after successful upload
  //     }, error => {
  //       console.error('Error uploading file:', error);
  //       alert('File upload failed');
  //     });
  //   } else {
  //     alert('Please select a file to upload.');
  //   }
  // }

  uploadTimetable() {
    if (this.fileToUpload) {
      const formData = new FormData();
      const filePath = `uploads/timetables/${this.selectedSemester1}/${this.fileToUpload.name}`; // Construct path
  
      formData.append('file', this.fileToUpload);
      formData.append('documentType', this.documentType);
      formData.append('fileName', this.fileToUpload.name);
      formData.append('fileType', this.fileType);
      formData.append('uploadDate', this.uploadDate.toISOString());
      formData.append('userEmail', this.userEmail);
      formData.append('semester', this.selectedSemester1);
      formData.append('documentCategory', this.documentCategory);
      formData.append('documentPath', filePath); // Include relative path for storing on server
  
      this.http.post<any>(this.apiUrl, formData).subscribe(response => {
        console.log('File uploaded successfully:', response);
        alert('File uploaded successfully!');
        this.closePopup(); // Close the popup after successful upload
      }, error => {
        console.error('Error uploading file:', error);
        alert('File upload failed');
      });
    } else {
      alert('Please select a file to upload.');
    }
  }

  onSemesterChange() {
    this.filteredTimetable = this.semesterTimetable[this.selectedSemester] || {};
  }
}
  
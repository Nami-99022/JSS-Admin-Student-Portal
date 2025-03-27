import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../staff.service';

interface Student {
  userName: string;
  email: string;
  password: string;
  phoneno: string;
  address: string;
  adharno: string;
  role: string;

  sslcMarksCard: File | null;
  beMarksCard: File | null;
  degreeCertificate: File | null;
  photo: File | null;
  staffProfile: File | null;

  dept: string;
  semester: string;
  momphoneno: string;
  dadphoneno: string;
  regno: string;
  panCardNumber: string;

  sslcMarksCardPath: string;
  beMarksCardPath: string;
  degreeCertificatePath: string;
  photoPath: string;
  staffProfilePath: string;

  adharCard: File | null;
  studyCertificate: File | null;
  transferCertificate: File | null;
  physicalFitness: File | null;
  migrationCertificate: File | null;
  incomeCertificate: File | null;
  casteCertificate: File | null;
  studsslcmarksCard: File | null;
  studphoto: File | null;
}
@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.css',
})
export class StudentRegistrationComponent {
  semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
  constructor(
    private router: Router,
    private http: HttpClient,
    private staffService: StaffService
  ) {}

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

  Goback() {
    this.router.navigate(['/sidemenu/students-management']);
  }

  student: Student = {
    userName: '',
    email: '',
    password: '',
    phoneno: '',
    address: '',
    adharno: '',

    role: 'Student',
    dept: '',
    semester: '',
    momphoneno: '',
    dadphoneno: '',
    regno: '',

    sslcMarksCardPath: 'null',
    beMarksCardPath: 'null',
    degreeCertificatePath: 'null',
    photoPath: 'null',
    panCardNumber: 'null',
    staffProfilePath: 'null',
    sslcMarksCard: null,
    beMarksCard: null,
    degreeCertificate: null,
    photo: null,

    staffProfile: null,
    adharCard: null,
    studyCertificate: null,
    transferCertificate: null,
    physicalFitness: null,
    migrationCertificate: null,
    incomeCertificate: null,
    casteCertificate: null,
    studsslcmarksCard: null,
    studphoto: null,
  };

  onSubmit() {
    const formData = new FormData();
    formData.append('userName', this.student.userName);
    formData.append('email', this.student.email);
    formData.append('password', this.student.password);
    formData.append('phoneno', this.student.phoneno);
    formData.append('address', this.student.address);
    formData.append('adharno', this.student.adharno);
    formData.append('role', this.student.role);
    formData.append('dept', this.student.dept);
    formData.append('semester', this.student.semester);
    formData.append('momphoneno', this.student.momphoneno);
    formData.append('dadphoneno', this.student.dadphoneno);
    formData.append('regno', this.student.regno);
    formData.append('panCardNumber', this.student.panCardNumber);

    if (this.student.sslcMarksCard)
      formData.append('sslcMarksCard', this.student.sslcMarksCard as Blob);
    if (this.student.beMarksCard)
      formData.append('beMarksCard', this.student.beMarksCard as Blob);
    if (this.student.degreeCertificate)
      formData.append(
        'degreeCertificate',
        this.student.degreeCertificate as Blob
      );
    if (this.student.photo)
      formData.append('photo', this.student.photo as Blob);
    if (this.student.staffProfile)
      formData.append('staffProfile', this.student.staffProfile as Blob);
    if (this.student.adharCard)
      formData.append('adharCard', this.student.adharCard as Blob);
    if (this.student.studyCertificate)
      formData.append(
        'studyCertificate',
        this.student.studyCertificate as Blob
      );
    if (this.student.transferCertificate)
      formData.append(
        'transferCertificate',
        this.student.transferCertificate as Blob
      );
    if (this.student.physicalFitness)
      formData.append('physicalFitness', this.student.physicalFitness as Blob);
    if (this.student.migrationCertificate)
      formData.append(
        'migrationCertificate',
        this.student.migrationCertificate as Blob
      );
    if (this.student.incomeCertificate)
      formData.append(
        'incomeCertificate',
        this.student.incomeCertificate as Blob
      );
    if (this.student.casteCertificate)
      formData.append(
        'casteCertificate',
        this.student.casteCertificate as Blob
      );
    if (this.student.studsslcmarksCard)
      formData.append(
        'studsslcmarksCard',
        this.student.studsslcmarksCard as Blob
      );
    if (this.student.studphoto)
      formData.append('studphoto', this.student.studphoto as Blob);

    const headers = new HttpHeaders();

    this.http
      .post('http://localhost:8080/users/register', formData, {
        headers,
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          console.log('Student registered successfully:', response);
          alert('Registration successful!');
          this.router.navigate(['/sidemenu/students-management']);
        },
        error: (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed!');
        },
      });
  }

  onFileSelectadharCard(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.adharCard = file;
      console.log('Adhar card selected:', file);
    } else {
      console.log('No file selected for Adhar card');
    }
  }

  onFileSelectSC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studyCertificate = file;
      console.log('Study Certificate selected:', file);
    }
  }

  onFileSelectTC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.transferCertificate = file;
      console.log('Transfer Certificate selected:', file);
    }
  }

  onFileSelectPF(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.physicalFitness = file;
      console.log('Physical Fitness certificate selected:', file);
    }
  }

  onFileSelectMC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.migrationCertificate = file;
      console.log('Migration Certificate selected:', file);
    }
  }

  onFileSelectIC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.incomeCertificate = file;
      console.log('Income Certificate selected:', file);
    }
  }

  onFileSelectCC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.casteCertificate = file;
      console.log('Caste Certificate selected:', file);
    }
  }

  onFileSelectstudMarkscard(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studsslcmarksCard = file;
      console.log('Student SSLC Marks Card selected:', file);
    }
  }

  onFileSelectstudphoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studphoto = file;
      console.log('Student Photo selected:', file);
    }
  }
}

// students: Student[] = [];

// onSubmit() {

//   if (
//     !this.student.userName ||
//     !this.student.regno ||
//     !this.student.phoneno ||
//     !this.student.address ||
//     !this.student.email ||
//     !this.student.password ||
//     !this.student.dept ||
//     !this.student.semester ||
//     !this.student.momphoneno ||
//     !this.student.dadphoneno
//   ) {
//     alert("Please fill all the fields");
//     return; // Prevent form submission if any field is empty
//   }

//   console.log("Submitting form with data:", this.student);

//   this.http.post('http://localhost:8080/users/register1', this.student,{ responseType: 'text' })
//     .subscribe({
//       next: (response) => {
//         console.log('Success:', response);
//         localStorage.setItem('loginUser', this.student.userName);
//         this.router.navigate(['/sidemenu/students-management']);
//         alert("Registration Successful");
//       },
//       error: (error: HttpErrorResponse) => {
//         console.error('Error:', error);
//         alert("Registration Unsuccessful");
//       }
//     });
// }

// onFileSelect(event: Event, type: string): void {
// const input = event.target as HTMLInputElement;
// if (input.files && input.files.length > 0) {
//   const file = input.files[0];

//   const MAX_SIZE = 5 * 1024 * 1024;
//   if (file.size > MAX_SIZE) {
//     alert('File size exceeds the maximum limit of 5MB');
//     return;
//   }

//   console.log(`${type} file selected:`, file);

//   if (type === 'marksCard') {
//     this.uploadMarksCard(file);
//   } else if (type === 'photo') {
//     this.uploadPhoto(file);
//   }
// }
// }

// uploadMarksCard(file: File): void {
// const formData = new FormData();
// formData.append('marksCard', file, file.name);

// this.http.post('http://localhost:8080/users/upload-marksCard', formData, { responseType: 'text' })
//   .subscribe({
//     next: (response) => {
//       console.log('Marks Card uploaded successfully:', response);
//       alert('Marks Card uploaded successfully');
//     },
//     error: (error) => {
//       console.error('Marks Card upload failed:', error);
//       alert('Marks Card upload failed');
//     }
//   });
// }

// uploadPhoto(file: File): void {
// const formData = new FormData();
// formData.append('photo', file, file.name);

// this.http.post('http://localhost:8080/users/upload-photo', formData, { responseType: 'text' })
//   .subscribe({
//     next: (response) => {
//       console.log('Photo uploaded successfully:', response);
//       alert('Photo uploaded successfully');
//     },
//     error: (error) => {
//       console.error('Photo upload failed:', error);
//       alert('Photo upload failed');
//     }
//   });
// }

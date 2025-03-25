import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  //   student = {

  //     password: '',
  //     email: '',

  //   };

  //   constructor(private router: Router,private http: HttpClient,private authservice: AuthService) {}
  // registrationForm: any;

  // onSubmit() {
  //   console.log("Attempting to log in with:", this.student);

  //   this.http.post<any>('http://localhost:8080/users/login', this.student, { responseType: 'json' })
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Login Success:', response);

  //         localStorage.setItem('isAuthenticated', 'true');
  //         localStorage.setItem('loginUser', this.student.email);
  //         localStorage.setItem('username', response.userName);

  //         console.log('Navigating to dashboard...');
  //         this.router.navigate(['/sidemenu/home']);
  //         alert("Login Successful");
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.error('Login Error:', error);
  //         alert("Login Unsuccessful");
  //       }
  //     });
  // }
  // }

  student = {
    email: '',
    password: '',
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private authservice: AuthService
  ) {}
  onSubmit() {
    console.log('Attempting to log in with:', this.student);

    this.http
      .post<any>('http://localhost:8080/users/login', this.student)
      .subscribe({
        next: (response) => {
          console.log('Login Success:', response);

          // Store authentication info in local storage
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('loginUser', response.email);
          localStorage.setItem('username', response.userName);
          localStorage.setItem('Semester', response.semester);

          // const formattedSemester = `Sem${response.semester}`;
          //   localStorage.setItem('Semester', formattedSemester);
          // Navigate to the home page
          this.router.navigate(['/sidemenu/home']);
          alert('Login Successful');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login Error:', error);
          alert('Login Unsuccessful. Please check your credentials.');
        },
      });
  }
}

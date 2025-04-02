import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackSystemComponent } from './feedback-system/feedback-system.component';
import { HomeComponent } from './home/home.component';
import { IAModuleComponent } from './ia-module/ia-module.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { PersonalDocumentsComponent } from './personal-documents/personal-documents.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { TeachingAidsComponent } from './teaching-aids/teaching-aids.component';
import { TimetableComponent } from './timetable/timetable.component';
import { authGuard } from '../auth.guard';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
import { StaffRegistrationComponent } from './staff-registration/staff-registration.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubjectManagementComponent } from './subject-management/subject-management.component';
import { NewAttendenceManagementComponent } from './new-attendence-management/new-attendence-management.component';
// import { StaffRegistrationComponent } from './staffmanagement/staff-registration/staff-registration.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'attendance-management',
    component: AttendanceManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'new-attendance-management',
    component: NewAttendenceManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'feedback-system',
    component: FeedbackSystemComponent,
    canActivate: [authGuard],
  },
  { path: 'ia-module', component: IAModuleComponent, canActivate: [authGuard] },
  {
    path: 'lesson-plan',
    component: LessonPlanComponent,
    canActivate: [authGuard],
  },
  {
    path: 'personal-documents',
    component: PersonalDocumentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'question-bank',
    component: QuestionBankComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students-management',
    component: StudentManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students-registration',
    component: StudentRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'teaching-aids',
    component: TeachingAidsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'time-table',
    component: TimetableComponent,
    canActivate: [authGuard],
  },
  {
    path: 'staff-management',
    component: StaffmanagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'staff-registration',
    component: StaffRegistrationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subject-management',
    component: SubjectManagementComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AttendanceManagementComponent,
    FeedbackSystemComponent,
    HomeComponent,
    IAModuleComponent,
    LessonPlanComponent,
    PersonalDocumentsComponent,
    QuestionBankComponent,
    StudentManagementComponent,
    TeachingAidsComponent,
    TimetableComponent,
    StaffmanagementComponent,
    NgxPaginationModule,
    SubjectManagementComponent,
  ],
  exports: [RouterModule],
})
export class SidemenuModule {}

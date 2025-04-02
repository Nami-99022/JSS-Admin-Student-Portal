import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttendenceManagementComponent } from './new-attendence-management.component';

describe('NewAttendenceManagementComponent', () => {
  let component: NewAttendenceManagementComponent;
  let fixture: ComponentFixture<NewAttendenceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAttendenceManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAttendenceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

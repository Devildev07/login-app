import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorPage } from './doctor.page';

describe('DoctorPage', () => {
  let component: DoctorPage;
  let fixture: ComponentFixture<DoctorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

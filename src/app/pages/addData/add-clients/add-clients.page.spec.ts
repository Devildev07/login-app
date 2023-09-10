import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddClientsPage } from './add-clients.page';

describe('AddClientsPage', () => {
  let component: AddClientsPage;
  let fixture: ComponentFixture<AddClientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

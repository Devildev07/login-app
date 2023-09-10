import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdvertiserPage } from './add-advertiser.page';

describe('AddAdvertiserPage', () => {
  let component: AddAdvertiserPage;
  let fixture: ComponentFixture<AddAdvertiserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddAdvertiserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

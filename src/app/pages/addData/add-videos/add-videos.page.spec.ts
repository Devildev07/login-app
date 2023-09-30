import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVideosPage } from './add-videos.page';

describe('AddVideosPage', () => {
  let component: AddVideosPage;
  let fixture: ComponentFixture<AddVideosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

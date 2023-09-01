import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertiserPage } from './advertiser.page';

describe('AdvertiserPage', () => {
  let component: AdvertiserPage;
  let fixture: ComponentFixture<AdvertiserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdvertiserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

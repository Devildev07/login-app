import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificatesPage } from './certificates.page';

describe('CertificatesPage', () => {
  let component: CertificatesPage;
  let fixture: ComponentFixture<CertificatesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CertificatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCategoryPage } from './modal-category.page';

describe('ModalCategoryPage', () => {
  let component: ModalCategoryPage;
  let fixture: ComponentFixture<ModalCategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

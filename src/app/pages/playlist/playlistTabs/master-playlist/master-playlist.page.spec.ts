import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterPlaylistPage } from './master-playlist.page';

describe('MasterPlaylistPage', () => {
  let component: MasterPlaylistPage;
  let fixture: ComponentFixture<MasterPlaylistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MasterPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

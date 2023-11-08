import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildPlaylistPage } from './child-playlist.page';

describe('ChildPlaylistPage', () => {
  let component: ChildPlaylistPage;
  let fixture: ComponentFixture<ChildPlaylistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChildPlaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

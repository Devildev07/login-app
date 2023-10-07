import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss'],
})
export class VideoPopupComponent implements OnInit {
  @Input() videoUrl?: string;

  constructor() {}

  ngOnInit() {}
}

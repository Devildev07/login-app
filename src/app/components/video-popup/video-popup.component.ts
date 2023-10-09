import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-video-popup',
  templateUrl: './video-popup.component.html',
  styleUrls: ['./video-popup.component.scss'],
})
export class VideoPopupComponent implements OnInit {
  @Input() videoUrl?: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}

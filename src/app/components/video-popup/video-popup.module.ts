import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPopupComponent } from './video-popup.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [VideoPopupComponent],
  imports: [CommonModule, IonicModule],
  exports: [VideoPopupComponent],
})
export class VideoPopupModule {}
  
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './otherServices/search.pipe';
import { GeneralVideoModalComponent } from './components/general-video-modal/general-video-modal.component';
import { PlaylistModalComponent } from './components/playlist-modal/playlist-modal.component';
import { AddLocationModalComponent } from './components/add-location-modal/add-location-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    SearchPipe,
    GeneralVideoModalComponent,
    PlaylistModalComponent,
    AddLocationModalComponent,
  ],
  exports: [
    SearchPipe,
    GeneralVideoModalComponent,
    PlaylistModalComponent,
    AddLocationModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}

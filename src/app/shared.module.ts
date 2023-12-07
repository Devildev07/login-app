import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './otherServices/search.pipe';
import { GeneralVideoModalComponent } from './components/general-video-modal/general-video-modal.component';
import { PlaylistModalComponent } from './components/playlist-modal/playlist-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [
    SearchPipe,
    GeneralVideoModalComponent,
    PlaylistModalComponent,
  ],
  exports: [SearchPipe, GeneralVideoModalComponent, PlaylistModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}

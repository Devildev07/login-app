import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { UpdateCatModalComponent } from './update-cat-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateCatModalComponent],
  imports: [IonicModule, CommonModule, FormsModule],
  exports: [UpdateCatModalComponent],
})
export class UpdateCatModule {}

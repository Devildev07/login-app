import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { UpdateCatModule } from 'src/app/components/update-cat-modal/update-cat.module';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    UpdateCatModule,
    SharedModule,
  ],
  declarations: [CategoryPage],
  exports: [CategoryPage],
})
export class CategoryPageModule {}

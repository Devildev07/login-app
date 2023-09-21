import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './otherServices/search.pipe';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [SearchPipe],
    exports: [SearchPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }

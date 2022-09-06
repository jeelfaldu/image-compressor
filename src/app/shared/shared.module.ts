import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DragDropDirective } from '../provider/drag-drop.directive';

import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    CardComponent,
    DragDropDirective
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    CardComponent,
    DragDropDirective,
    ImageCropperModule
  ]
})
export class SharedModule { }

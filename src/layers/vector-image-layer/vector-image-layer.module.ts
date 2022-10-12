import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolVectorImageLayerComponent } from './vector-image-layer.component';

@NgModule({
  declarations: [NolVectorImageLayerComponent],
  exports: [NolVectorImageLayerComponent],
  imports: [CommonModule]
})
export class NolVectorImageLayerModule { }
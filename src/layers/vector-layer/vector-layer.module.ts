import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolVectorLayerComponent } from './vector-layer.component';

@NgModule({
  declarations: [NolVectorLayerComponent],
  exports: [NolVectorLayerComponent],
  imports: [CommonModule]
})
export class NolVectorLayerModule { }
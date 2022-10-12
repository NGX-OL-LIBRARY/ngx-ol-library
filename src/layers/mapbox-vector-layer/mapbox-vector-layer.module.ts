import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapboxVectorLayerComponent } from './mapbox-vector-layer.component';

@NgModule({
  declarations: [NolMapboxVectorLayerComponent],
  exports: [NolMapboxVectorLayerComponent],
  imports: [CommonModule]
})
export class NolMapboxVectorLayerModule { }
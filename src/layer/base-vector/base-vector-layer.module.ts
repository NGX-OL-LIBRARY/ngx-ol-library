import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBaseVectorLayerComponent } from './base-vector-layer.component';

@NgModule({
  declarations: [NolBaseVectorLayerComponent],
  exports: [NolBaseVectorLayerComponent],
  imports: [CommonModule]
})
export class NolBaseVectorLayerModule { }
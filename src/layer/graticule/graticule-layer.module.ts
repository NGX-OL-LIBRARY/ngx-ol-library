import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolGraticuleLayerComponent } from './graticule-layer.component';

@NgModule({
  declarations: [NolGraticuleLayerComponent],
  exports: [NolGraticuleLayerComponent],
  imports: [CommonModule]
})
export class NolGraticuleLayerModule { }
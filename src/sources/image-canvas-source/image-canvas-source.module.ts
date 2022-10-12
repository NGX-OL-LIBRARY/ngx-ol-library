import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageCanvasSourceComponent } from './image-canvas-source.component';

@NgModule({
  declarations: [NolImageCanvasSourceComponent],
  exports: [NolImageCanvasSourceComponent],
  imports: [CommonModule]
})
export class NolImageCanvasSourceModule { }
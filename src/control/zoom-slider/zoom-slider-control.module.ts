import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolZoomSliderControlComponent } from './zoom-slider-control.component';

@NgModule({
  declarations: [NolZoomSliderControlComponent],
  exports: [NolZoomSliderControlComponent],
  imports: [CommonModule]
})
export class NolZoomSliderControlModule { }
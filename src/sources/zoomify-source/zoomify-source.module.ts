import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolZoomifySourceComponent } from './zoomify-source.component';

@NgModule({
  declarations: [NolZoomifySourceComponent],
  exports: [NolZoomifySourceComponent],
  imports: [CommonModule]
})
export class NolZoomifySourceModule { }
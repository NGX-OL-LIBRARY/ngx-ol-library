import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolZoomControlComponent } from './zoom-control.component';

@NgModule({
  declarations: [NolZoomControlComponent],
  exports: [NolZoomControlComponent],
  imports: [CommonModule]
})
export class NolZoomControlModule { }
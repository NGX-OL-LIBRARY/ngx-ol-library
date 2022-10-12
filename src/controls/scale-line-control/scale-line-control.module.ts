import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolScaleLineControlComponent } from './scale-line-control.component';

@NgModule({
  declarations: [NolScaleLineControlComponent],
  exports: [NolScaleLineControlComponent],
  imports: [CommonModule]
})
export class NolScaleLineControlModule { }
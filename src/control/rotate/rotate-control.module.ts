import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolRotateControlComponent } from './rotate-control.component';

@NgModule({
  declarations: [NolRotateControlComponent],
  exports: [NolRotateControlComponent],
  imports: [CommonModule]
})
export class NolRotateControlModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolFullScreenControlComponent } from './full-screen-control.component';

@NgModule({
  declarations: [NolFullScreenControlComponent],
  exports: [NolFullScreenControlComponent],
  imports: [CommonModule]
})
export class NolFullScreenControlModule { }
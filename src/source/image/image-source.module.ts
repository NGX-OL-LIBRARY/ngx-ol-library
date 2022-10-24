import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageSourceComponent } from './image-source.component';

@NgModule({
  declarations: [NolImageSourceComponent],
  exports: [NolImageSourceComponent],
  imports: [CommonModule]
})
export class NolImageSourceModule { }
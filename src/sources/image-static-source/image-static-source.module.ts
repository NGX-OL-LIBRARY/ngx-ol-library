import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageStaticSourceComponent } from './image-static-source.component';

@NgModule({
  declarations: [NolImageStaticSourceComponent],
  exports: [NolImageStaticSourceComponent],
  imports: [CommonModule]
})
export class NolImageStaticSourceModule { }
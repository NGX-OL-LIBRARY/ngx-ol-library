import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolStamenSourceComponent } from './stamen-source.component';

@NgModule({
  declarations: [NolStamenSourceComponent],
  exports: [NolStamenSourceComponent],
  imports: [CommonModule]
})
export class NolStamenSourceModule { }
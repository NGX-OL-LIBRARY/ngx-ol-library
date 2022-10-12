import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolVectorSourceComponent } from './vector-source.component';

@NgModule({
  declarations: [NolVectorSourceComponent],
  exports: [NolVectorSourceComponent],
  imports: [CommonModule]
})
export class NolVectorSourceModule { }
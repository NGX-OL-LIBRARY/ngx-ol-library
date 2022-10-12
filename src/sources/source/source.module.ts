import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolSourceComponent } from './source.component';

@NgModule({
  declarations: [NolSourceComponent],
  exports: [NolSourceComponent],
  imports: [CommonModule]
})
export class NolSourceModule { }
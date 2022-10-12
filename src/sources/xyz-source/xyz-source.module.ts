import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolXYZSourceComponent } from './xyz-source.component';

@NgModule({
  declarations: [NolXYZSourceComponent],
  exports: [NolXYZSourceComponent],
  imports: [CommonModule]
})
export class NolXYZSourceModule { }
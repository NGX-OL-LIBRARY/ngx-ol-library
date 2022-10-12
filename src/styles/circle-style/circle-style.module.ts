import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolCircleStyleComponent } from './circle-style.component';

@NgModule({
  declarations: [NolCircleStyleComponent],
  exports: [NolCircleStyleComponent],
  imports: [CommonModule]
})
export class NolCircleStyleModule { }
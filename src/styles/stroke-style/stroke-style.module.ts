import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolStrokeStyleComponent } from './stroke-style.component';

@NgModule({
  declarations: [NolStrokeStyleComponent],
  exports: [NolStrokeStyleComponent],
  imports: [CommonModule]
})
export class NolStrokeStyleModule { }
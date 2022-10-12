import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolFillStyleComponent } from './fill-style.component';

@NgModule({
  declarations: [NolFillStyleComponent],
  exports: [NolFillStyleComponent],
  imports: [CommonModule]
})
export class NolFillStyleModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageStyleComponent } from './image-style.component';

@NgModule({
  declarations: [NolImageStyleComponent],
  exports: [NolImageStyleComponent],
  imports: [CommonModule]
})
export class NolImageStyleModule { }
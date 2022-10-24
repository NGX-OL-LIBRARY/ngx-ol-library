import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTextStyleComponent } from './text-style.component';

@NgModule({
  declarations: [NolTextStyleComponent],
  exports: [NolTextStyleComponent],
  imports: [CommonModule]
})
export class NolTextStyleModule { }
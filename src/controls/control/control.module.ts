import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolControlComponent } from './control.component';

@NgModule({
  declarations: [NolControlComponent],
  exports: [NolControlComponent],
  imports: [CommonModule]
})
export class NolControlModule { }
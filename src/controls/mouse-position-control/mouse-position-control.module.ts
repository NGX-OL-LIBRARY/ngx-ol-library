import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMousePositionControlComponent } from './mouse-position-control.component';

@NgModule({
  declarations: [NolMousePositionControlComponent],
  exports: [NolMousePositionControlComponent],
  imports: [CommonModule]
})
export class NolMousePositionControlModule { }
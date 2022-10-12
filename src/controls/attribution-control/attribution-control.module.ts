import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolAttributionControlComponent } from './attribution-control.component';

@NgModule({
  declarations: [NolAttributionControlComponent],
  exports: [NolAttributionControlComponent],
  imports: [CommonModule]
})
export class NolAttributionControlModule { }
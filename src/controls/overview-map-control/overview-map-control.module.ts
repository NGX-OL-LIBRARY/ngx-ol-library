import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolOverviewMapControlComponent } from './overview-map-control.component';

@NgModule({
  declarations: [NolOverviewMapControlComponent],
  exports: [NolOverviewMapControlComponent],
  imports: [CommonModule]
})
export class NolOverviewMapControlModule { }
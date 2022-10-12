import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolOSMSourceComponent } from './osm-source.component';

@NgModule({
  declarations: [NolOSMSourceComponent],
  exports: [NolOSMSourceComponent],
  imports: [CommonModule]
})
export class NolOSMSourceModule { }
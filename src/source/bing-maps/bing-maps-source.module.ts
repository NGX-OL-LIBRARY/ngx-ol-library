import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBingMapsSourceComponent } from './bing-maps-source.component';

@NgModule({
  declarations: [NolBingMapsSourceComponent],
  exports: [NolBingMapsSourceComponent],
  imports: [CommonModule]
})
export class NolBingMapsSourceModule { }
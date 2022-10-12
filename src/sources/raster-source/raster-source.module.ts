import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolRasterSourceComponent } from './raster-source.component';

@NgModule({
  declarations: [NolRasterSourceComponent],
  exports: [NolRasterSourceComponent],
  imports: [CommonModule]
})
export class NolRasterSourceModule { }
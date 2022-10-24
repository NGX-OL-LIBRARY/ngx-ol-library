import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolWMTSSourceComponent } from './wmts-source.component';

@NgModule({
  declarations: [NolWMTSSourceComponent],
  exports: [NolWMTSSourceComponent],
  imports: [CommonModule]
})
export class NolTileWMTSSourceModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileWMTSSourceComponent } from './tile-wmts-source.component';

@NgModule({
  declarations: [NolTileWMTSSourceComponent],
  exports: [NolTileWMTSSourceComponent],
  imports: [CommonModule]
})
export class NolTileWMTSSourceModule { }
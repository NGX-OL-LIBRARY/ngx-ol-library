import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileWMSSourceComponent } from './tile-wms-source.component';

@NgModule({
  declarations: [NolTileWMSSourceComponent],
  exports: [NolTileWMSSourceComponent],
  imports: [CommonModule]
})
export class NolTileWMSSourceModule { }
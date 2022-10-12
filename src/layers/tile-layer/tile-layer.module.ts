import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileLayerComponent } from './tile-layer.component';

@NgModule({
  declarations: [NolTileLayerComponent],
  exports: [NolTileLayerComponent],
  imports: [CommonModule]
})
export class NolTileLayerModule { }
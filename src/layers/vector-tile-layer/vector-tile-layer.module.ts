import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolVectorTileLayerComponent } from './vector-tile-layer.component';

@NgModule({
  declarations: [NolVectorTileLayerComponent],
  exports: [NolVectorTileLayerComponent],
  imports: [CommonModule]
})
export class NolVectorTileLayerModule { }
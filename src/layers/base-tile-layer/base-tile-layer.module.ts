import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBaseTileLayerComponent } from './base-tile-layer.component';

@NgModule({
  declarations: [NolBaseTileLayerComponent],
  exports: [NolBaseTileLayerComponent],
  imports: [CommonModule]
})
export class NolBaseTileLayerModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolVectorTileSourceComponent } from './vector-tile-source.component';

@NgModule({
  declarations: [NolVectorTileSourceComponent],
  exports: [NolVectorTileSourceComponent],
  imports: [CommonModule]
})
export class NolVectorTileSourceModule { }
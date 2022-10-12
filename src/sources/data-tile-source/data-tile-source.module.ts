import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDataTileSourceComponent } from './data-tile-source.component';

@NgModule({
  declarations: [NolDataTileSourceComponent],
  exports: [NolDataTileSourceComponent],
  imports: [CommonModule]
})
export class NolDataTileSourceModule { }
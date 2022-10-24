import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileSourceComponent } from './tile-source.component';

@NgModule({
  declarations: [NolTileSourceComponent],
  exports: [NolTileSourceComponent],
  imports: [CommonModule]
})
export class NolTileSourceModule { }
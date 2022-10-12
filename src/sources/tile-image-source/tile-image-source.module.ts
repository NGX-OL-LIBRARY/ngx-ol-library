import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileImageSourceComponent } from './tile-image-source.component';

@NgModule({
  declarations: [NolTileImageSourceComponent],
  exports: [NolTileImageSourceComponent],
  imports: [CommonModule]
})
export class NolTileImageSourceModule { }
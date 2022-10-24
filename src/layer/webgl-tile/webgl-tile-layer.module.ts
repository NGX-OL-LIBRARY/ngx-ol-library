import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolWebGLTileLayerComponent } from './webgl-tile-layer.component';

@NgModule({
  declarations: [NolWebGLTileLayerComponent],
  exports: [NolWebGLTileLayerComponent],
  imports: [CommonModule]
})
export class NolWebGLTileLayerModule { }
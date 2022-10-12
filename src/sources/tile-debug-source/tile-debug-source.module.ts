import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileDebugSourceComponent } from './tile-debug-source.component';

@NgModule({
  declarations: [NolTileDebugSourceComponent],
  exports: [NolTileDebugSourceComponent],
  imports: [CommonModule]
})
export class NolTileDebugSourceModule { }
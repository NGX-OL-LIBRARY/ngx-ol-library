import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileJSONSourceComponent } from './tile-json-source.component';

@NgModule({
  declarations: [NolTileJSONSourceComponent],
  exports: [NolTileJSONSourceComponent],
  imports: [CommonModule]
})
export class NolTileJSONSourceModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolUrlTileSourceComponent } from './url-tile-source.component';

@NgModule({
  declarations: [NolUrlTileSourceComponent],
  exports: [NolUrlTileSourceComponent],
  imports: [CommonModule]
})
export class NolUrlTileSourceModule { }
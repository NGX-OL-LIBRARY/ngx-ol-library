import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolTileArcGISRestSourceComponent } from './tile-arcgis-rest-source.component';

@NgModule({
  declarations: [NolTileArcGISRestSourceComponent],
  exports: [NolTileArcGISRestSourceComponent],
  imports: [CommonModule]
})
export class NolTileArcGISRestSourceModule { }
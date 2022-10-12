import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolHeatmapLayerComponent } from './heatmap-layer.component';

@NgModule({
  declarations: [NolHeatmapLayerComponent],
  exports: [NolHeatmapLayerComponent],
  imports: [CommonModule]
})
export class NolHeatmapLayerModule { }
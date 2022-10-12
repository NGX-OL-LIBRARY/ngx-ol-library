import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageArcGISRestSourceComponent } from './image-arcgis-rest-source.component';

@NgModule({
  declarations: [NolImageArcGISRestSourceComponent],
  exports: [NolImageArcGISRestSourceComponent],
  imports: [CommonModule]
})
export class NolImageArcGISRestSourceModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolGeoTIFFSourceComponent } from './geotiff-source.component';
import { NolSourceInfoComponent } from './source-info.component';
import { NolSourceOptionsComponent } from './source-options.component';

@NgModule({
  declarations: [NolGeoTIFFSourceComponent, NolSourceInfoComponent, NolSourceOptionsComponent],
  exports: [NolGeoTIFFSourceComponent, NolSourceInfoComponent, NolSourceOptionsComponent],
  imports: [CommonModule]
})
export class NolGeotiffSourceModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageWMSSourceComponent } from './image-wms-source.component';

@NgModule({
  declarations: [NolImageWMSSourceComponent],
  exports: [NolImageWMSSourceComponent],
  imports: [CommonModule]
})
export class NolImageWmsSourceModule { }
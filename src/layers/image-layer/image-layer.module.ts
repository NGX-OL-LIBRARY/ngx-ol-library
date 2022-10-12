import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolImageLayerComponent } from './image-layer.component';



@NgModule({
  declarations: [NolImageLayerComponent],
  exports: [NolImageLayerComponent],
  imports: [CommonModule]
})
export class NolImageLayerModule { }

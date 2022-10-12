import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBaseImageLayerComponent } from './base-image-layer.component';



@NgModule({
  declarations: [NolBaseImageLayerComponent],
  exports: [NolBaseImageLayerComponent],
  imports: [CommonModule]
})
export class NolBaseImageLayerModule { }

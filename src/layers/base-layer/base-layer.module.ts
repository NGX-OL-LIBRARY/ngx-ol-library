import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBaseLayerComponent } from './base-layer.component';



@NgModule({
  declarations: [NolBaseLayerComponent],
  exports: [NolBaseLayerComponent],
  imports: [CommonModule]
})
export class NolBaseLayerModule { }

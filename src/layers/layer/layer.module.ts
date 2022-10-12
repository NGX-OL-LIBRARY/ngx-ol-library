import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolLayerComponent } from './layer.component';



@NgModule({
  declarations: [NolLayerComponent],
  exports: [NolLayerComponent],
  imports: [CommonModule]
})
export class NolLayerModule { }

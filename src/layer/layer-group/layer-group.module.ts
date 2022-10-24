import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolLayerGroupComponent } from './layer-group.component';



@NgModule({
  declarations: [NolLayerGroupComponent],
  exports: [NolLayerGroupComponent],
  imports: [CommonModule]
})
export class NolLayerGroupModule { }

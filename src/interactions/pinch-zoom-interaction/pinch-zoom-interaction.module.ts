import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolPinchZoomInteractionComponent } from './pinch-zoom-interaction.component';

@NgModule({
  declarations: [NolPinchZoomInteractionComponent],
  exports: [NolPinchZoomInteractionComponent],
  imports: [CommonModule]
})
export class NolPinchZoomInteractionModule { }
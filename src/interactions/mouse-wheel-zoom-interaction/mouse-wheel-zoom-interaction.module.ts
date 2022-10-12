import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMouseWheelZoomInteractionComponent } from './mouse-wheel-zoom-interaction.component';

@NgModule({
  declarations: [NolMouseWheelZoomInteractionComponent],
  exports: [NolMouseWheelZoomInteractionComponent],
  imports: [CommonModule]
})
export class NolMouseWheelZoomInteractionModule { }
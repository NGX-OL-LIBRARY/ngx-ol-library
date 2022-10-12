import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDragRotateAndZoomInteractionComponent } from './drag-rotate-and-zoom-interaction.component';

@NgModule({
  declarations: [NolDragRotateAndZoomInteractionComponent],
  exports: [NolDragRotateAndZoomInteractionComponent],
  imports: [CommonModule]
})
export class NolDragRotateAndZoomInteractionModule { }
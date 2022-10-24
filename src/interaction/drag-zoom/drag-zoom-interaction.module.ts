import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDragZoomInteractionComponent } from './drag-zoom-interaction.component';

@NgModule({
  declarations: [NolDragZoomInteractionComponent],
  exports: [NolDragZoomInteractionComponent],
  imports: [CommonModule]
})
export class NolDragZoomInteractionModule { }
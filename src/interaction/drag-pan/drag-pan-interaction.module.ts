import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDragPanInteractionComponent } from './drag-pan-interaction.component';

@NgModule({
  declarations: [NolDragPanInteractionComponent],
  exports: [NolDragPanInteractionComponent],
  imports: [CommonModule]
})
export class NolDragPanInteractionModule { }
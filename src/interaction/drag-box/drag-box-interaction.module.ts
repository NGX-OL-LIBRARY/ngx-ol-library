import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDragBoxInteractionComponent } from './drag-box-interaction.component';

@NgModule({
  declarations: [NolDragBoxInteractionComponent],
  exports: [NolDragBoxInteractionComponent],
  imports: [CommonModule]
})
export class NolDragBoxInteractionModule { }
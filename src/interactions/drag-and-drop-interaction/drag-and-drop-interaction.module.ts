import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDragAndDropInteractionComponent } from './drag-and-drop-interaction.component';

@NgModule({
  declarations: [NolDragAndDropInteractionComponent],
  exports: [NolDragAndDropInteractionComponent],
  imports: [CommonModule]
})
export class NolDragAndDropInteractionModule { }
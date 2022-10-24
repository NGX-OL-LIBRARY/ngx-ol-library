import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolKeyboardPanInteractionComponent } from './keyboard-pan-interaction.component';

@NgModule({
  declarations: [NolKeyboardPanInteractionComponent],
  exports: [NolKeyboardPanInteractionComponent],
  imports: [CommonModule]
})
export class NolKeyboardPanInteractionModule { }
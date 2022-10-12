import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolDrawInteractionComponent } from './draw-interaction.component';

@NgModule({
  declarations: [NolDrawInteractionComponent],
  exports: [NolDrawInteractionComponent],
  imports: [CommonModule]
})
export class NolDrawInteractionModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolPinchRotateInteractionComponent } from './pinch-rotate-interaction.component';

@NgModule({
  declarations: [NolPinchRotateInteractionComponent],
  exports: [NolPinchRotateInteractionComponent],
  imports: [CommonModule]
})
export class NolPinchRotateInteractionModule { }
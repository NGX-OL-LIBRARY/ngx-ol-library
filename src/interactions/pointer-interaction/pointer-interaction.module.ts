import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolPointerInteractionComponent } from './pointer-interaction.component';

@NgModule({
  declarations: [NolPointerInteractionComponent],
  exports: [NolPointerInteractionComponent],
  imports: [CommonModule]
})
export class NolPointerInteractionModule { }
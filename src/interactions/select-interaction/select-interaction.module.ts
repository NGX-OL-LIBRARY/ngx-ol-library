import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolSelectInteractionComponent } from './select-interaction.component';

@NgModule({
  declarations: [NolSelectInteractionComponent],
  exports: [NolSelectInteractionComponent],
  imports: [CommonModule]
})
export class NolSelectInteractionModule { }
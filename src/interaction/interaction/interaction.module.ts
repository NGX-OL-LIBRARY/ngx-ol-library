import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolInteractionComponent } from './interaction.component';

@NgModule({
  declarations: [NolInteractionComponent],
  exports: [NolInteractionComponent],
  imports: [CommonModule]
})
export class NolInteractionModule { }
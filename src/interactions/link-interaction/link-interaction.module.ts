import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolLinkInteractionComponent } from './link-interaction.component';

@NgModule({
  declarations: [NolLinkInteractionComponent],
  exports: [NolLinkInteractionComponent],
  imports: [CommonModule]
})
export class NolLinkInteractionModule { }
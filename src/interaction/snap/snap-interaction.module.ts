import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolSnapInteractionComponent } from './snap-interaction.component';

@NgModule({
  declarations: [NolSnapInteractionComponent],
  exports: [NolSnapInteractionComponent],
  imports: [CommonModule]
})
export class NolSnapInteractionModule { }
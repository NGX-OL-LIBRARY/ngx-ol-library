import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolOverlayComponent } from './overlay.component';
import { NolOverlayContentDirective } from './overlay-content.directive';

@NgModule({
  declarations: [NolOverlayComponent, NolOverlayContentDirective],
  exports: [NolOverlayComponent, NolOverlayContentDirective],
  imports: [CommonModule]
})
export class NolOverlayModule { }
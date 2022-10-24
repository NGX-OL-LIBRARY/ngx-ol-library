import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolIIIFSourceComponent } from './iiif-source.component';

@NgModule({
  declarations: [NolIIIFSourceComponent],
  exports: [NolIIIFSourceComponent],
  imports: [CommonModule]
})
export class NolIIIFSourceModule { }
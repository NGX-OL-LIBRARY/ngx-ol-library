import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolCartoDBSourceComponent } from './cartodb-source.component';

@NgModule({
  declarations: [NolCartoDBSourceComponent],
  exports: [NolCartoDBSourceComponent],
  imports: [CommonModule]
})
export class NolCartoDBSourceModule { }
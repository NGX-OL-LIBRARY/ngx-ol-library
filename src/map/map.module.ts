import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapComponent } from './map.component';



@NgModule({
  declarations: [NolMapComponent],
  exports: [NolMapComponent],
  imports: [CommonModule]
})
export class NolMapModule { }

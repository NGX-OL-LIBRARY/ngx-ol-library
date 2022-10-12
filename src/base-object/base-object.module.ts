import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolBaseObjectComponent } from './base-object.component';



@NgModule({
  declarations: [NolBaseObjectComponent],
  exports: [NolBaseObjectComponent],
  imports: [CommonModule]
})
export class NolBaseObjectModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolStyleComponent } from './style.component';

@NgModule({
  declarations: [NolStyleComponent],
  exports: [NolStyleComponent],
  imports: [CommonModule]
})
export class NolStyleModule { }
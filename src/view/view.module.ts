import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolViewComponent } from './view.component';



@NgModule({
  declarations: [NolViewComponent],
  exports: [NolViewComponent],
  imports: [CommonModule]
})
export class NolViewModule { }

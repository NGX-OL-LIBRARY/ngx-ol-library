import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolClusterSourceComponent } from './cluster-source.component';

@NgModule({
  declarations: [NolClusterSourceComponent],
  exports: [NolClusterSourceComponent],
  imports: [CommonModule]
})
export class NolClusterSourceModule { }
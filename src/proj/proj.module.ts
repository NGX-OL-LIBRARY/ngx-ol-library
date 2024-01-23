import { NgModule } from '@angular/core';
import { NolFromLonLatPipe } from './from-lon-lat.pipe';
import { NolToLonLatPipe } from './to-lon-lat.pipe';



@NgModule({
  imports: [NolFromLonLatPipe, NolToLonLatPipe],
  exports: [NolFromLonLatPipe, NolToLonLatPipe],
})
export class NolProjModule { }

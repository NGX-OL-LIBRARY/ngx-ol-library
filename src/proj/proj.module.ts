import { NgModule } from '@angular/core';
import { NolFromLonLatPipe } from './from-lon-lat.pipe';
import { NolToLonLatPipe } from './to-lon-lat.pipe';
import { NolTransformExtentPipe } from './transform-extent.pipe';
import { NolTransformPipe } from './transform.pipe';



@NgModule({
  imports: [
    NolFromLonLatPipe, 
    NolToLonLatPipe,
    NolTransformExtentPipe,
    NolTransformPipe,
  ],
  exports: [
    NolFromLonLatPipe, 
    NolToLonLatPipe,
    NolTransformExtentPipe,
    NolTransformPipe,
  ],
})
export class NolProjModule { }

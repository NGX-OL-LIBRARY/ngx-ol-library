import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolFromLonLatPipe } from './from-lon-lat.pipe';
import { NolToLonLatPipe } from './to-lon-lat.pipe';
import { NolTransformPipe } from './transform.pipe';
import { NolTransformExtentPipe } from './transform-extent.pipe';
import { NolProjService } from './proj.service';

@NgModule({
  declarations: [
    NolFromLonLatPipe,
    NolToLonLatPipe,
    NolTransformPipe,
    NolTransformExtentPipe
  ],
  exports: [
    NolFromLonLatPipe,
    NolToLonLatPipe,
    NolTransformPipe,
    NolTransformExtentPipe
  ],
  imports: [CommonModule],
  providers: [NolProjService]
})
export class NolProjModule { }
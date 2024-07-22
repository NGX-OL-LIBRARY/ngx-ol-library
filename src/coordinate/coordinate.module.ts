import { NgModule } from '@angular/core';
import { NolAddPipe } from './add.pipe';
import { NolFormatPipe } from './format.pipe';
import { NolRotatePipe } from './rotate.pipe';
import { NolToStringHDMSPipe } from './to-string-hdms.pipe';
import { NolToStringXYPipe } from './to-string-xy.pipe';



@NgModule({
  imports: [NolAddPipe, NolFormatPipe, NolRotatePipe, NolToStringHDMSPipe, NolToStringXYPipe],
  exports: [NolAddPipe, NolFormatPipe, NolRotatePipe, NolToStringHDMSPipe, NolToStringXYPipe]
})
export class NolCoordinateModule { }

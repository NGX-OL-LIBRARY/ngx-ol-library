import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolAddPipe } from './add.pipe';
import { NolFormatPipe } from './format.pipe';
import { NolRotatePipe } from './rotate.pipe';
import { NolToStringHDMSPipe } from './to-string-hdms.pipe';
import { NolToStringXYPipe } from './to-string-xy.pipe';
import { NolCoordinateService } from './coordinate.service';


@NgModule({
  declarations: [
    NolAddPipe,
    NolFormatPipe,
    NolRotatePipe,
    NolToStringHDMSPipe,
    NolToStringXYPipe
  ],
  exports: [
    NolAddPipe,
    NolFormatPipe,
    NolRotatePipe,
    NolToStringHDMSPipe,
    NolToStringXYPipe
  ],
  imports: [CommonModule],
  providers: [NolCoordinateService]
})
export class NolCoordinateModule { }
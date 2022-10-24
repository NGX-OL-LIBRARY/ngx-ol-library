/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate, toStringHDMS } from 'ol/coordinate';

@Pipe({
  name: 'nolToStringHDMS',
  pure: true
})
export class NolToStringHDMSPipe implements PipeTransform {
  transform(value: Coordinate, fractionDigits?: number): string {
    return toStringHDMS(value, fractionDigits);
  }
}

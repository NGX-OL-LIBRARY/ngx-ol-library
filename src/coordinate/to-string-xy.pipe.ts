/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate, toStringXY } from 'ol/coordinate';

@Pipe({
  name: 'nolToStringXY',
  pure: true
})
export class NolToStringXYPipe implements PipeTransform {
  transform(value: Coordinate, fractionDigits?: number): string {
    return toStringXY(value, fractionDigits);
  }
}

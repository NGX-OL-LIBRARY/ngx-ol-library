/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate, rotate } from 'ol/coordinate';

@Pipe({
  name: 'nolRotate',
  pure: true
})
export class NolRotatePipe implements PipeTransform {
  transform(value: Coordinate, angle: number): Coordinate {
    return rotate(value, angle);
  }
}

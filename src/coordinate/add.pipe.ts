/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { add, Coordinate } from 'ol/coordinate';

@Pipe({
  name: 'nolAdd',
  pure: true
})
export class NolAddPipe implements PipeTransform {
  transform(value: Coordinate, delta: Coordinate): Coordinate {
    return add(value, delta);
  }
}

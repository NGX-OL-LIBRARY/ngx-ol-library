/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate } from 'ol/coordinate';
import { ProjectionLike, toLonLat } from 'ol/proj';

@Pipe({
  name: 'nolToLonLat',
  pure: true
})
export class NolToLonLatPipe implements PipeTransform {
  transform(value: Coordinate, projection?: ProjectionLike): Coordinate {
    return toLonLat(value, projection);
  }
}

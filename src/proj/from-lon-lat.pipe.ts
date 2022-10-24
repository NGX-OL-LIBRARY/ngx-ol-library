/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate } from 'ol/coordinate';
import { fromLonLat, ProjectionLike } from 'ol/proj';

@Pipe({
  name: 'nolFromLonLat',
  pure: true
})
export class NolFromLonLatPipe implements PipeTransform {
  transform(value: Coordinate, projection?: ProjectionLike): Coordinate {
    return fromLonLat(value, projection);
  }
}

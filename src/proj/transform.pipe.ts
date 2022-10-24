/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate } from 'ol/coordinate';
import { Projection, ProjectionLike, transform } from 'ol/proj';

@Pipe({
  name: 'nolTransform',
  pure: true
})
export class NolTransformPipe implements PipeTransform {
  transform(value: Coordinate, source: Projection, destination: ProjectionLike): Coordinate {
    return transform(value, source, destination);
  }
}

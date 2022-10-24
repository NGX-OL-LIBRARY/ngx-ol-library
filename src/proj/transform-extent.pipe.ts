/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Extent } from 'ol/extent';
import { ProjectionLike, transformExtent } from 'ol/proj';

@Pipe({
  name: 'nolTransformExtent',
  pure: true
})
export class NolTransformExtentPipe implements PipeTransform {
  transform(value: Extent, source: ProjectionLike, destination: ProjectionLike, stops?: number): Extent {
    return transformExtent(value, source, destination, stops);
  }
}

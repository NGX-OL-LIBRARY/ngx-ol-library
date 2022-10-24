/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Pipe, PipeTransform } from '@angular/core';

import { Coordinate, format } from 'ol/coordinate';

@Pipe({
  name: 'nolFormat',
  pure: true
})
export class NolFormatPipe implements PipeTransform {
  transform(value: Coordinate, template: string, fractionDigits?: number): string {
    return format(value, template, fractionDigits);
  }
}

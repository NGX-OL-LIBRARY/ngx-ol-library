import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate, rotate } from 'ol/coordinate';

/**
 * Rotate `coordinate` by angle. `coordinate` is modified in place and returned by the function.
 * @name nolRotate
 * @order 3
 */
@Pipe({
  name: 'nolRotate',
  standalone: true
})
export class NolRotatePipe implements PipeTransform {

  /**
   * Rotate `coordinate` by angle. `coordinate` is modified in place and returned by the function.
   * @param value Coordinate.
   * @param angle Angle in radian.
   * @returns Coordinate.
   */
  transform(value: Coordinate, angle: number): Coordinate {
    return rotate(value, angle);
  }

}

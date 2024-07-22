import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate, toStringXY } from 'ol/coordinate';

/**
 * Format a coordinate as a comma delimited string.
 * @name nolToStringXY
 * @order 5
 */
@Pipe({
  name: 'nolToStringXY',
  standalone: true
})
export class NolToStringXYPipe implements PipeTransform {

  /**
   * Format a coordinate as a comma delimited string.
   * @param value Coordinate.
   * @param fractionDigits The number of digits to include after the decimal point. 
   * Default is `0`.
   * @returns XY.
   */
  transform(value: Coordinate, fractionDigits?: number): string {
    return toStringXY(value, fractionDigits);
  }

}

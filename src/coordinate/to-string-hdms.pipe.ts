import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate, toStringHDMS } from 'ol/coordinate';

/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and seconds.
 * @name nolToStringHDMS
 * @order 4
 */
@Pipe({
  name: 'nolToStringHDMS',
  standalone: true
})
export class NolToStringHDMSPipe implements PipeTransform {

  /**
   * Format a geographic coordinate with the hemisphere, degrees, minutes, and seconds.
   * @param value Coordinate.
   * @param fractionDigits The number of digits to include after the decimal point. 
   * Default is `0`.
   * @returns Hemisphere, degrees, minutes and seconds.
   */
  transform(value: Coordinate, fractionDigits?: number): string {
    return toStringHDMS(value, fractionDigits);
  }

}

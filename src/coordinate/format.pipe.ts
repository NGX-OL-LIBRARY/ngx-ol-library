import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate, format } from 'ol/coordinate';

/**
 * Transforms the given Coordinate to a string using the given string template. 
 * The strings `{x}` and `{y}` in the template will be replaced with the first 
 * and second coordinate values respectively.
 * @name nolFormat
 * @order 2
 */
@Pipe({
  name: 'nolFormat',
  standalone: true
})
export class NolFormatPipe implements PipeTransform {

  /**
   * Transforms the given Coordinate to a string using the given string template. 
   * The strings `{x}` and `{y}` in the template will be replaced with the first 
   * and second coordinate values respectively.
   * @param value Coordinate.
   * @param template A template string with `{x}` and `{y}` placeholders that 
   * will be replaced by first and second coordinate values.
   * @param fractionDigits The number of digits to include after the decimal point. 
   * Default is `0`.
   * @returns Formatted coordinate.
   */
  transform(value: Coordinate, template: string, fractionDigits?: number): string {
    return format(value, template, fractionDigits);
  }

}

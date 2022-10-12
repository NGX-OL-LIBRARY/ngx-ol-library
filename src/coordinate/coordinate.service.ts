import { Injectable } from '@angular/core';
import {
  add,
  Coordinate,
  CoordinateFormat,
  createStringXY,
  format,
  rotate,
  toStringHDMS,
  toStringXY
} from 'ol/coordinate';

@Injectable()
export class NolCoordinateService {

  constructor() { }

  /**
   * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
   * by the function.
   *
   * @param {Coordinate} coordinate Coordinate.
   * @param {Coordinate} delta Delta.
   * @return {Coordinate} The input coordinate adjusted by
   * the given delta.
   */
  add(coordinate: Coordinate, delta: Coordinate): Coordinate {
    return add(coordinate, delta);
  }

  /**
   * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
   * used to format
   * a {Coordinate} to a string.
   *
   * @param {number} [fractionDigits] The number of digits to include
   *    after the decimal point. Default is `0`.
   * @return {CoordinateFormat} Coordinate format.
   */
  createStringXY(fractionDigits?: number): CoordinateFormat {
    return createStringXY(fractionDigits);
  }

  /**
   * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
   * using the given string template. The strings `{x}` and `{y}` in the template
   * will be replaced with the first and second coordinate values respectively.
   *
   * @param {Coordinate} coordinate Coordinate.
   * @param {string} template A template string with `{x}` and `{y}` placeholders
   *     that will be replaced by first and second coordinate values.
   * @param {number} [fractionDigits] The number of digits to include
   *    after the decimal point. Default is `0`.
   * @return {string} Formatted coordinate.
   */
  format(coordinate: Coordinate, template: string, fractionDigits?: number): string {
    return format(coordinate, template, fractionDigits);
  }

  /**
   * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
   * returned by the function.
   *
   * @param {Coordinate} coordinate Coordinate.
   * @param {number} angle Angle in radian.
   * @return {Coordinate} Coordinate.
   */
  rotate(coordinate: Coordinate, angle: number): Coordinate {
    return rotate(coordinate, angle);
  }

  /**
   * Format a geographic coordinate with the hemisphere, degrees, minutes, and
   * seconds.
   *
   * @param {Coordinate} coordinate Coordinate.
   * @param {number} [fractionDigits] The number of digits to include
   *    after the decimal point. Default is `0`.
   * @return {string} Hemisphere, degrees, minutes and seconds.
   */
  toStringHDMS(coordinate: Coordinate, fractionDigits?: number): string {
    return toStringHDMS(coordinate, fractionDigits);
  }

  /**
   * Format a coordinate as a comma delimited string.
   *
   * @param {Coordinate} coordinate Coordinate.
   * @param {number} [fractionDigits] The number of digits to include
   *    after the decimal point. Default is `0`.
   * @return {string} XY.
   */
  toStringXY(coordinate: Coordinate, fractionDigits?: number): string {
    return toStringXY(coordinate, fractionDigits);
  }
}

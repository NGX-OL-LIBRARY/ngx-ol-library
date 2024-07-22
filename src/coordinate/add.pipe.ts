import { Pipe, PipeTransform } from '@angular/core';
import { add, Coordinate } from 'ol/coordinate';

/**
 * Add delta to `coordinate`. `coordinate` is modified in place and returned by the pipe.
 * @name nolAdd
 * @order 1
 */
@Pipe({
  name: 'nolAdd',
  standalone: true
})
export class NolAddPipe implements PipeTransform {

  /**
   * Add delta to `coordinate`. `coordinate` is modified in place and returned by the pipe.
   * @param value Coordinate.
   * @param delta Delta.
   * @returns The input coordinate adjusted by the given delta.
   */
  transform(value: Coordinate, delta: Coordinate): Coordinate {
    return add(value, delta);
  }

}

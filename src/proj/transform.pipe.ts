import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike, transform } from 'ol/proj';

/**
 * Transforms a coordinate from source projection to destination projection. 
 * This returns a new coordinate (and does not modify the original).
 * @name nolTransform
 * @order 3
 */
@Pipe({
  name: 'nolTransform',
  standalone: true
})
export class NolTransformPipe implements PipeTransform {

  /**
   * Transforms a coordinate from source projection to destination projection. 
   * This returns a new coordinate (and does not modify the original).
   * @param {Coordinate} coordinate Coordinate.
   * @param {ProjectionLike} source Source projection-like.
   * @param {ProjectionLike} destination Destination projection-like.
   * @returns {Coordinate} Coordinate.
   */
  transform(
    coordinate: Coordinate, 
    source: ProjectionLike, 
    destination: ProjectionLike
  ): Coordinate {
    return transform(coordinate, source, destination);
  }

}

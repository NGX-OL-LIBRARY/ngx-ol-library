import { Pipe, PipeTransform } from '@angular/core';
import { Extent } from 'ol/extent';
import { ProjectionLike, transformExtent } from 'ol/proj';

/**
 * Transforms an extent from source projection to destination projection. 
 * This returns a new extent (and does not modify the original).
 * @name transformExtent
 * @order 4
 */
@Pipe({
  name: 'transformExtent',
  standalone: true
})
export class NolTransformExtentPipe implements PipeTransform {

  /**
   * Transforms an extent from source projection to destination projection. 
   * This returns a new extent (and does not modify the original).
   * @param {Extent} extent The extent to transform.
   * @param {ProjectionLike} source Source projection-like.
   * @param {ProjectionLike} destination Destination projection-like.
   * @param {number|undefined} stops Number of stops per side used for the transform. 
   * By default only the corners are used.
   * @returns {Extent} The transformed extent.
   */
  transform(
    extent: Extent, 
    source: ProjectionLike, 
    destination: ProjectionLike, 
    stops?: number
  ): Extent {
    return transformExtent(extent, source, destination, stops);
  }

}

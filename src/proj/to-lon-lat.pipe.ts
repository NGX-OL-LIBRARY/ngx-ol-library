import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike, toLonLat } from 'ol/proj';

/**
 * Transforms a coordinate to longitude/latitude.
 * @name toLonLat
 * @order 2
 */
@Pipe({
  name: 'toLonLat',
  standalone: true
})
export class NolToLonLatPipe implements PipeTransform {

  /**
   * Transforms a coordinate to longitude/latitude.
   * @param {Coordinate} coordinate Projected coordinate.
   * @param {ProjectionLike|undefined} projection Projection of the coordinate. 
   * The default is Web Mercator, i.e. 'EPSG:3857'.
   * @returns {Coordinate} Coordinate as longitude and latitude, i.e. an array with longitude 
   * as 1st and latitude as 2nd element.
   */
  transform(coordinate: Coordinate, projection?: ProjectionLike): Coordinate {
    return toLonLat(coordinate, projection);
  }

}

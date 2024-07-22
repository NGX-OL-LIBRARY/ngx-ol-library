import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike, fromLonLat } from 'ol/proj';

/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @name nolFromLonLat
 * @order 1
 */
@Pipe({
  name: 'nolFromLonLat',
  standalone: true
})
export class NolFromLonLatPipe implements PipeTransform {

  /**
   * Transforms a coordinate from longitude/latitude to a different projection.
   * @param {Coordinate} coordinate Coordinate as longitude and latitude, 
   * i.e. an array with longitude as 1st and latitude as 2nd element.
   * @param {ProjectionLike|undefined} projection Target projection. The default is 
   * Web Mercator, i.e. 'EPSG:3857'.
   * @returns {Coordinate} Coordinate projected to the target projection.
   */
  transform(coordinate: Coordinate, projection?: ProjectionLike): Coordinate {
    return fromLonLat(coordinate, projection);
  }

}

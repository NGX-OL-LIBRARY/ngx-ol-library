import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { NolCoordinateService } from './coordinate.service';

@Pipe({
  name: 'nolRotate',
  pure: true
})
export class NolRotatePipe implements PipeTransform {

  constructor(protected coordiante: NolCoordinateService) {}

  transform(value: Coordinate, angle: number): Coordinate {
    return this.coordiante.rotate(value, angle);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { NolCoordinateService } from './coordinate.service';

@Pipe({
  name: 'nolAdd',
  pure: true
})
export class NolAddPipe implements PipeTransform {

  constructor(protected coordiante: NolCoordinateService) {}

  transform(value: Coordinate, delta: Coordinate): Coordinate {
    return this.coordiante.add(value, delta);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { NolCoordinateService } from './coordinate.service';

@Pipe({
  name: 'nolToStringXY',
  pure: true
})
export class NolToStringXYPipe implements PipeTransform {

  constructor(protected coordiante: NolCoordinateService) {}

  transform(value: Coordinate, fractionDigits?: number): string {
    return this.coordiante.toStringXY(value, fractionDigits);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { NolCoordinateService } from './coordinate.service';

@Pipe({
  name: 'nolToStringHDMS',
  pure: true
})
export class NolToStringHDMSPipe implements PipeTransform {

  constructor(protected coordiante: NolCoordinateService) {}

  transform(value: Coordinate, fractionDigits?: number): string {
    return this.coordiante.toStringHDMS(value, fractionDigits);
  }

}

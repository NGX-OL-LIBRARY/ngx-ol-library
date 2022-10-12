import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { NolCoordinateService } from './coordinate.service';

@Pipe({
  name: 'nolFormat',
  pure: true
})
export class NolFormatPipe implements PipeTransform {

  constructor(protected coordiante: NolCoordinateService) {}

  transform(value: Coordinate, template: string, fractionDigits?: number): string {
    return this.coordiante.format(value, template, fractionDigits);
  }

}

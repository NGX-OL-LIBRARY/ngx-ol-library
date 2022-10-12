import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { ProjectionLike } from 'ol/proj';
import { NolProjService } from './proj.service';

@Pipe({
  name: 'nolFromLonLat',
  pure: true
})
export class NolFromLonLatPipe implements PipeTransform {

  constructor(protected proj: NolProjService) {}

  transform(value: Coordinate, projection?: ProjectionLike): Coordinate {
    return this.proj.fromLonLat(value, projection);
  }

}

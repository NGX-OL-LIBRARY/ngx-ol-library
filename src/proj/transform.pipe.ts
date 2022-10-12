import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Projection, ProjectionLike } from 'ol/proj';
import { NolProjService } from './proj.service';

@Pipe({
  name: 'nolTransform',
  pure: true
})
export class NolTransformPipe implements PipeTransform {

  constructor(protected proj: NolProjService) {}

  transform(value: Coordinate, source: Projection, destination: ProjectionLike): Coordinate {
    return this.proj.transform(value, source, destination);
  }

}

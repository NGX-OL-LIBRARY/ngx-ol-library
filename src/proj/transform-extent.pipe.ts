import { Pipe, PipeTransform } from '@angular/core';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import { NolProjService } from './proj.service';

@Pipe({
  name: 'nolTransformExtent',
  pure: true
})
export class NolTransformExtentPipe implements PipeTransform {

  constructor(protected proj: NolProjService) {}

  transform(value: Extent, source: ProjectionLike, destination: ProjectionLike, stops?: number): Extent {
    return this.proj.transformExtent(value, source, destination, stops);
  }

}

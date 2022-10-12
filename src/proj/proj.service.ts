import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { 
  addCoordinateTransforms, 
  addEquivalentProjections, 
  addProjection, 
  clearUserProjection, 
  equivalent, 
  fromLonLat, 
  get, 
  getPointResolution, 
  getTransform, 
  getUserProjection, 
  Projection, 
  ProjectionLike, 
  setUserProjection, 
  toLonLat, 
  transform, 
  transformExtent, 
  TransformFunction,
  useGeographic
} from 'ol/proj';
import { Units } from 'ol/proj/Units';

@Injectable()
export class NolProjService {

  constructor() { }

  addCoordinateTransforms(
    source: ProjectionLike,
    destination: ProjectionLike,
    forward: ((coordinate: Coordinate) => Coordinate),
    inverse: ((coordinate: Coordinate) => Coordinate)
  ): void {
    addCoordinateTransforms(source, destination, forward, inverse);
  }

  addEquivalentProjections(projections: Projection[]): void {
    addEquivalentProjections(projections);
  }

  addProjection(projection: Projection): void {
    addProjection(projection);
  }

  clearUserProjection(): void {
    clearUserProjection();
  }

  equivalent(projection1: Projection, projection2: Projection): boolean {
    return equivalent(projection1, projection2);
  }

  fromLonLat(coordinate: Coordinate, projection?: ProjectionLike): Coordinate {
    return fromLonLat(coordinate, projection);
  }

  get(projectionLike: ProjectionLike): Projection | null {
    return get(projectionLike);
  }

  getPointResolution(projection: ProjectionLike, resolution: number, point: Coordinate, unit?: Units): number {
    return getPointResolution(projection, resolution, point, unit);
  }

  getTransform(source: ProjectionLike, destination: ProjectionLike): TransformFunction {
    return getTransform(source, destination);
  }

  getUserProjection(): Projection | null {
    return getUserProjection();
  }

  setUserProjection(projection: ProjectionLike): void {
    setUserProjection(projection);
  }

  toLonLat(coordinate: Coordinate, projection?: ProjectionLike): Coordinate {
    return toLonLat(coordinate, projection);
  }

  transform(coordinate: Coordinate, source: ProjectionLike, destination: ProjectionLike): Coordinate {
    return transform(coordinate, source, destination);
  }

  transformExtent(extent: Extent, source: ProjectionLike, destination: ProjectionLike, stops?: number): Extent {
    return transformExtent(extent, source, destination, stops);
  }

  useGeographic(): void {
    useGeographic();
  }

}

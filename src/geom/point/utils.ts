import { InjectOptions } from '@angular/core';
import { injectFeature } from 'ngx-ol-library/feature';
import { injectGeometryCollection } from 'ngx-ol-library/geom/geometry-collection';
import { injectMultiPointGeometry } from 'ngx-ol-library/geom/multi-point';
import { Feature } from 'ol';
import { GeometryCollection, MultiPoint, Point } from 'ol/geom';

export function injectPointGeometryHost() {
  const options: InjectOptions = { host: true, optional: true };
  const feature = injectFeature(options);
  const geometryCollection = injectGeometryCollection(options);
  const multiPoint = injectMultiPointGeometry(options);

  let getInstance: () => (MultiPoint | GeometryCollection | Feature),
      addPoint: (point: Point) => void,
      removePoint: (point: Point) => void,
      changed: () => void;

  if (multiPoint) {
    getInstance = () => multiPoint.getInstance();
    addPoint = (point: Point) => {
      multiPoint.addPoint(point);
    };
    removePoint = (point: Point) => {
      multiPoint.removePoint(point);
    };
    changed = () => multiPoint.changed();
  } else if (geometryCollection) {
    getInstance = () => geometryCollection.getInstance();
    addPoint = (point: Point) => {
      geometryCollection.addGeometry(point);
    };
    removePoint = (point: Point) => {
      geometryCollection.addGeometry(point);
    };
    changed = () => geometryCollection.getInstance().changed();
  } else if (feature) {
    getInstance = () => feature.getInstance();
    addPoint = (point: Point) => {
      feature.getInstance().setGeometry(point);
    };
    // eslint-disable-next-line
    removePoint = (point: Point) => {
      feature.getInstance().setGeometry(undefined);
    };
    changed = () => feature.getInstance().changed();
  } else {
    throw new Error(
      '`nol-point-geometry` component must be nested within `nol-feature`' +
      ', `nol-geometry-collection` or `nol-multi-point-geometry` component.'
    );
  }

  return { getInstance, addPoint, removePoint, changed };
}
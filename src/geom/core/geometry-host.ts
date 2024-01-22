import { InjectOptions } from '@angular/core';
import { injectFeature } from 'ngx-ol-library/feature';
import { injectGeometryCollection } from 'ngx-ol-library/geom/geometry-collection';
import { Geometry } from 'ol/geom';

export function injectGeometryHost(selector: string) {
  const options: InjectOptions = { optional: true, host: true };
  const geometryCollection = injectGeometryCollection(options);
  const feature = injectFeature(options);

  let getInstance, addGeometry, removeGeometry,
      changed: () => void;

  if (geometryCollection) {
    getInstance = () => geometryCollection.getInstance();
    addGeometry = (geometry: Geometry) => {
      geometryCollection.addGeometry(geometry);
    }
    removeGeometry = (geometry: Geometry) => {
      geometryCollection.removeGeometry(geometry);
    }
    changed = () => geometryCollection.getInstance().changed();
  } else if (feature) {
    getInstance = () => feature.getInstance();
    addGeometry = (geometry: Geometry) => {
      feature.getInstance().setGeometry(geometry);
    }
    removeGeometry = () => {
      feature.getInstance().setGeometry(undefined);
    }
    changed = () => feature.getInstance().changed();
  } else {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-feature`' +
      ' or `nol-geometry-collection` component.'
    );
  }

  return { getInstance, addGeometry, removeGeometry, changed };
}
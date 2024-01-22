import { InjectOptions } from '@angular/core';
import { injectFeature } from 'ngx-ol-library/feature';
import { injectGeometryCollection } from 'ngx-ol-library/geom/geometry-collection';
import { injectMultiPolygonGeometry } from 'ngx-ol-library/geom/multi-polygon';
import { GeometryCollection, MultiPolygon, Polygon } from 'ol/geom';
import { Feature } from 'ol';

export function injectPolygonGeometryHost() {
  const options: InjectOptions = { host: true, optional: true };
  const feature = injectFeature(options);
  const geometryCollection = injectGeometryCollection(options);
  const multiPolygon = injectMultiPolygonGeometry(options);

  let getInstance: () => (MultiPolygon | GeometryCollection | Feature),
      addPolygon: (polygon: Polygon) => void,
      removePolygon: (polygon: Polygon) => void,
      changed: () => void;

  if (multiPolygon) {
    getInstance = () => multiPolygon.getInstance();
    addPolygon = (polygon: Polygon) => {
      multiPolygon.addPolygon(polygon);
    };
    removePolygon = (polygon: Polygon) => {
      multiPolygon.removePolygon(polygon);
    };
    changed = () => multiPolygon.changed();
  } else if (geometryCollection) {
    getInstance = () => geometryCollection.getInstance();
    addPolygon = (polygon: Polygon) => {
      geometryCollection.addGeometry(polygon);
    };
    removePolygon = (polygon: Polygon) => {
      geometryCollection.addGeometry(polygon);
    };
    changed = () => geometryCollection.getInstance().changed();
  } else if (feature) {
    getInstance = () => feature.getInstance();
    addPolygon = (polygon: Polygon) => {
      feature.getInstance().setGeometry(polygon);
    };
    // eslint-disable-next-line
    removePolygon = (polygon: Polygon) => {
      feature.getInstance().setGeometry(undefined);
    };
    changed = () => feature.getInstance().changed();
  } else {
    throw new Error(
      '`nol-polygon-geometry` component must be nested within `nol-feature`' +
      ', `nol-geometry-collection` or `nol-multi-polygon-geometry` component.'
    );
  }

  return { getInstance, addPolygon, removePolygon, changed };
}
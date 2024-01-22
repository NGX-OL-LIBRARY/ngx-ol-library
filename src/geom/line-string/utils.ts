import { InjectOptions } from '@angular/core';
import { injectFeature } from 'ngx-ol-library/feature';
import { injectGeometryCollection } from 'ngx-ol-library/geom/geometry-collection';
import { injectMultiLineStringGeometry } from 'ngx-ol-library/geom/multi-line-string';
import { Feature } from 'ol';
import { GeometryCollection, LineString, MultiLineString } from 'ol/geom';

export function injectLineStringGeometryHost() {
  const options: InjectOptions = { optional: true, host: true };
  const feature = injectFeature(options);
  const geometryCollection = injectGeometryCollection(options);
  const multiLineString = injectMultiLineStringGeometry(options);

  let getInstance: () => (MultiLineString | GeometryCollection | Feature),
      addLineString: (lineString: LineString) => void,
      removeLineString: (lineString: LineString) => void,
      changed: () => void;

  if (multiLineString) {
    getInstance = () => multiLineString.getInstance();
    addLineString = (lineString: LineString) => {
      multiLineString.addLineString(lineString);
    };
    removeLineString = (lineString: LineString) => {
      multiLineString.removeLineString(lineString);
    };
    changed = () => multiLineString.changed();
  } else if (geometryCollection) {
    getInstance = () => geometryCollection.getInstance();
    addLineString = (lineString: LineString) => {
      geometryCollection.addGeometry(lineString);
    };
    removeLineString = (lineString: LineString) => {
      geometryCollection.addGeometry(lineString);
    };
    changed = () => geometryCollection.getInstance().changed();
  } else if (feature) {
    getInstance = () => feature.getInstance();
    addLineString = (lineString: LineString) => {
      feature.getInstance().setGeometry(lineString);
    };
    // eslint-disable-next-line
    removeLineString = (lineString: LineString) => {
      feature.getInstance().setGeometry(undefined);
    };
    changed = () => feature.getInstance().changed();
  } else {
    throw new Error(
      '`nol-line-string-geometry` component must be nested within `nol-feature`' +
      ', `nol-geometry-collection` or `nol-multi-line-string-geometry` component.'
    );
  }

  return { getInstance, addLineString, removeLineString, changed };
}
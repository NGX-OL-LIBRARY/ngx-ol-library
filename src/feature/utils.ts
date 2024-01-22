import { InjectOptions } from '@angular/core';
import { injectVectorSource } from 'ngx-ol-library/source/vector';

export function injectFeatureHost() {
  const options: InjectOptions = { optional: true, host: true };
  const vectorSource = injectVectorSource(options);

  if (!vectorSource) {
    throw new Error(
      '`nol-feature` component must be nested within `nol-vector-source` component.'
    );
  }

  return vectorSource;
}
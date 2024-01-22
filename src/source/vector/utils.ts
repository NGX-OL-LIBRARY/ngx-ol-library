import { InjectOptions } from '@angular/core';
import { injectVectorLayer } from 'ngx-ol-library/layer/vector';

export function injectVectorSourceHost() {
  const options: InjectOptions = { optional: true, host: true };
  const vectorSourceHost = injectVectorLayer(options);

  if (!vectorSourceHost) {
    throw new Error(
      '`nol-vector-source` component must be nested within `nol-vector-layer` component.'
    );
  }

  return vectorSourceHost;
}
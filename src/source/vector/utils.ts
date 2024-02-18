import { InjectOptions } from '@angular/core';
import { useHeatmapLayer } from 'ngx-ol-library/layer/heatmap';
import { injectVectorLayer } from 'ngx-ol-library/layer/vector';
import { useVectorImageLayer } from 'ngx-ol-library/layer/vector-image';
import { useClusterSource } from 'ngx-ol-library/source/cluster';

export function useVectorSourceHost() {
  const options: InjectOptions = { optional: true, host: true };
  const vectorLayer = injectVectorLayer(options);
  const vectorImageLayer = useVectorImageLayer(options);
  const heatmapLayer = useHeatmapLayer(options);
  const clusterSource = useClusterSource(options);
  const host = clusterSource || heatmapLayer || vectorImageLayer || vectorLayer;

  if (!host) {
    throw new Error(
      '`nol-vector-source` component must be nested within `nol-vector-layer`, ' +
      '`nol-heatmap-layer`, `nol-vector-image-layer` or `nol-cluster-source` component.'
    );
  }

  return host;
}
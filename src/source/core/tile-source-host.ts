import { InjectOptions } from '@angular/core';
import { injectTileLayer } from 'ngx-ol-library/layer/tile';
import { injectRasterSource } from 'ngx-ol-library/source/raster';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import TileSource from 'ol/source/Tile';

export function useTileSourceHost(selector: string) {
  const options: InjectOptions = { optional: true, host: true };
  const tileLayer = injectTileLayer(options);
  const rasterSource = injectRasterSource(options);

  let addSource, removeSource;

  if (rasterSource) {
    addSource = (source: Source|Layer) => rasterSource.addSource(source);
    removeSource = (source: Source|Layer) => rasterSource.removeSource(source);
  } else if (tileLayer) {
    addSource = (source: TileSource) => tileLayer.getInstance().setSource(source);
    removeSource = () => tileLayer.getInstance().setSource(null);
  } else {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-tile-layer`' +
      ' or `nol-raster-source` component.'
    );
  }

  return { addSource, removeSource };
}
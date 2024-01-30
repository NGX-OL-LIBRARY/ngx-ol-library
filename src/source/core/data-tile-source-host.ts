import { InjectOptions } from '@angular/core';
import { injectTileLayer } from 'ngx-ol-library/layer/tile';
import { useWebGLTileLayer } from 'ngx-ol-library/layer/webgl-tile';
import { injectRasterSource } from 'ngx-ol-library/source/raster';
import Layer from 'ol/layer/Layer';
import { SourceType } from 'ol/layer/WebGLTile';
import Source from 'ol/source/Source';
import TileSource from 'ol/source/Tile';

export function useDataTileSourceHost(selector: string) {
  const options: InjectOptions = { optional: true, host: true };
  const tileLayer = injectTileLayer(options);
  const webglTileLayer = useWebGLTileLayer(options);
  const rasterSource = injectRasterSource(options);

  let getInstance, addSource, removeSource;

  if (rasterSource) {
    getInstance = () => rasterSource.getInstance();
    addSource = (source: Source|Layer) => rasterSource.addSource(source);
    removeSource = (source: Source|Layer) => rasterSource.removeSource(source);
  } else if (tileLayer) {
    getInstance = () => tileLayer.getInstance();
    addSource = (source: TileSource) => tileLayer.getInstance().setSource(source);
    removeSource = () => tileLayer.getInstance().setSource(null);
  } else if (webglTileLayer) {
    getInstance = () => webglTileLayer.getInstance();
    addSource = (source: SourceType) => webglTileLayer.getInstance().setSource(source);
    removeSource = () => webglTileLayer.getInstance().setSource(null);
  } else {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-tile-layer`' +
      ' `nol-webgl-tile-layer` or `nol-raster-source` component.'
    );
  }

  return { getInstance, addSource, removeSource };
}
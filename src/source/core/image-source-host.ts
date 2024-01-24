import { InjectOptions } from '@angular/core';
import { injectImageLayer } from 'ngx-ol-library/layer/image';
import { injectRasterSource } from 'ngx-ol-library/source/raster';
import Layer from 'ol/layer/Layer';
import ImageSource from 'ol/source/Image';
import Source from 'ol/source/Source';

export function useImageSourceHost(selector: string) {
  const options: InjectOptions = { optional: true, host: true };
  const imageLayer = injectImageLayer(options);
  const rasterSource = injectRasterSource(options);

  let addSource, removeSource;

  if (rasterSource) {
    addSource = (source: Source|Layer) => rasterSource.addSource(source);
    removeSource = (source: Source|Layer) => rasterSource.removeSource(source);
  } else if (imageLayer) {
    addSource = (source: ImageSource) => imageLayer.getInstance().setSource(source);
    removeSource = () => imageLayer.getInstance().setSource(null);
  } else {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-image-layer`' +
      ' or `nol-raster-source` component.'
    );
  }

  return { addSource, removeSource };
}
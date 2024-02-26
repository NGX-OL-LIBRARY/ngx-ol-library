import { InjectOptions } from '@angular/core';
import { useOverviewMapControl } from 'ngx-ol-library/control/overview-map';
import { injectLayerGroup } from 'ngx-ol-library/layer/group';
import { injectMap } from 'ngx-ol-library/map';
import BaseLayer from 'ol/layer/Base';

export function injectLayerHost(selector: string) {
  const options: InjectOptions = { optional: true, host: true };
  const map = injectMap(options);
  const overviewMap = useOverviewMapControl(options);
  const layerGroup = injectLayerGroup(options);

  let getInstance, addLayer, removeLayer;

  if (layerGroup) {
    getInstance = () => layerGroup.getInstance();
    addLayer = (layer: BaseLayer) => {
      const layers = layerGroup.getInstance().getLayers();
      return layers.push(layer);
    }
    removeLayer = (layer: BaseLayer) => {
      const layers = layerGroup.getInstance().getLayers();
      return layers.remove(layer);
    };
  } else if (overviewMap) {
    getInstance = () => overviewMap.getInstance();
    addLayer = (layer: BaseLayer) =>{
      return overviewMap.getInstance().getOverviewMap().addLayer(layer);
    }
    removeLayer = (layer: BaseLayer) => {
      return overviewMap.getInstance().getOverviewMap().removeLayer(layer);
    }
  } else if (map) {
    getInstance = () => map.getInstance();
    addLayer = (layer: BaseLayer) => map.getInstance().addLayer(layer);
    removeLayer = (layer: BaseLayer) => map.getInstance().removeLayer(layer);
  } else {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-map`' +
      ', `nol-overview-map-control` or `nol-layer-group` component.'
    );
  }

  return { getInstance, addLayer, removeLayer };
}
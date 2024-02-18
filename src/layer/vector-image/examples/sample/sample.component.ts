import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorImageLayerModule } from 'ngx-ol-library/layer/vector-image';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';
import Fill from 'ol/style/Fill';
import Style, { StyleFunction } from 'ol/style/Style';
import GeoJSON from 'ol/format/GeoJSON';
import { Collection, Map, MapBrowserEvent } from 'ol';
import Feature from 'ol/Feature';

@Component({
  selector: 'nol-vector-image-layer-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolVectorImageLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
  ],
  template: `
    <nol-map 
      [nolHeight]="'400px'" 
      (nolPointermove)="displayFeatureInfo($event)"
      (nolClick)="displayFeatureInfo($event)"
    >
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-vector-image-layer [nolImageRatio]="2" [nolStyle]="style">
        <nol-vector-source
          [nolUrl]="'https://openlayers.org/data/vector/ecoregions.json'"
          [nolFormat]="format"
        />
      </nol-vector-image-layer>
      <nol-vector-layer
        [nolStyle]="{
          'stroke-color': 'rgba(255, 255, 255, 0.7)',
          'stroke-width': 2,
        }"
      >
        <nol-vector-source [nolFeatures]="highlight" />
      </nol-vector-layer>
    </nol-map>
    <div class="info">{{ info ?? '&nbsp;' }}</div>
  `,
  styles: `
    :host > .info {
      margin-top: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolVectorImageLayerSampleExampleComponent {

  info?: string;
  highlight = new Collection<Feature>();

  readonly format = new GeoJSON();
  readonly style: StyleFunction = (feature) => {
     return new Style({
      fill: new Fill({
        color: feature.get('COLOR') ?? '#eee',
      }),
     });
  };

  displayFeatureInfo(evt: MapBrowserEvent<PointerEvent>): void {
    if (evt.dragging) return;
    const map = evt.target as Map;
    const pixel = evt.type === 'pointermove' 
      ? map.getEventPixel(evt.originalEvent) 
      : evt.pixel;
    const feature = map.forEachFeatureAtPixel(pixel, feature => feature);
    const highlight = this.highlight.item(0);

    this.info = feature?.get('ECO_NAME');
    
    if (feature !== highlight) {
      if (highlight) {
        this.highlight.clear();
      }
      if (feature) {
        this.highlight.push(feature as Feature);
      }
    }
    
  }

}
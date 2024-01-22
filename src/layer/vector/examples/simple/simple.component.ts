import { Component, ViewChild } from '@angular/core';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';
import { Collection, Feature, MapBrowserEvent } from 'ol';
import { Geometry } from 'ol/geom';
import { Pixel } from 'ol/pixel';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'nol-vector-layer-simple-example',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolPointermove)="onPointMove($event)" (nolClick)="onClick($event)">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1"></nol-view>
      <nol-vector-layer 
        [nolBackground]="'#1a2b39'"
        [nolStyle]="{
          'fill-color': ['string', ['get', 'COLOR'], '#eee'],
        }"
      >
        <nol-vector-source [nolFormat]="format" [nolUrl]="url"></nol-vector-source>
      </nol-vector-layer>
      <nol-vector-layer
        [nolStyle]="{
          'stroke-color': 'rgba(255, 255, 255, 0.7)',
          'stroke-width': 2,
        }"
      >
        <nol-vector-source [nolFeatures]="overlayFeatures"></nol-vector-source>
      </nol-vector-layer>
    </nol-map>
    <div class="info" [innerHTML]="eco_region_name"></div>
  `,
  styles: `
    :host > .info {
      margin-top: 16px;
    }
  `
})
export class NolVectorLayerSimpleExampleComponent {

  @ViewChild(NolMapComponent) private readonly map!: NolMapComponent;

  readonly format = new GeoJSON();
  readonly url = 'https://openlayers.org/data/vector/ecoregions.json';

  eco_region_name: string = '&nbsp;';
  overlayFeatures = new Collection<Feature<Geometry>>();
  highlight?: Feature<Geometry>;

  displayFeatureInfo(pixel: Pixel): void {
    const map = this.map.getInstance();
    const feature = map.forEachFeatureAtPixel(pixel, feature => feature) as Feature<Geometry>;

    if (feature) {
      this.eco_region_name = feature.get('ECO_NAME') || '&nbsp;';
    } else {
      this.eco_region_name = '&nbsp;';
    }
  
    if (feature !== this.highlight) {
      if (this.highlight) {
        this.overlayFeatures.remove(this.highlight);
      }
      if (feature) {
        this.overlayFeatures.push(feature);
      }
      this.highlight = feature;
    }
  }

  onPointMove(evt: MapBrowserEvent<PointerEvent>): void {
    if (evt.dragging) {
      return;
    }
    const pixel = this.map.getInstance().getEventPixel(evt.originalEvent);
    this.displayFeatureInfo(pixel);
  }

  onClick(evt:  MapBrowserEvent<PointerEvent>): void {
    this.displayFeatureInfo(evt.pixel);
  }
}
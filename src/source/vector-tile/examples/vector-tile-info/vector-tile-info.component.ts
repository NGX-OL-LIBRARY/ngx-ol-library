import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NolVectorTileLayerModule } from 'ngx-ol-library/layer/vector-tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolVectorTileSourceModule } from 'ngx-ol-library/source/vector-tile';
import { NolViewModule } from 'ngx-ol-library/view';
import { Feature, MapBrowserEvent } from 'ol';
import MVT from 'ol/format/MVT';

@Component({
  selector: 'nol-vector-tile-source-vector-tile-info-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolVectorTileLayerModule,
    NolVectorTileSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolPointermove)="onPointerMove($event)">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-vector-tile-layer>
        <nol-vector-tile-source [nolFormat]="format" [nolUrl]="url" />
      </nol-vector-tile-layer>
      @if(info) {
        <pre class="info">{{ info }}</pre>
      }
    </nol-map>
  `,
  styles: `
    :host .info {
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 0;
      margin: 0;
      max-height: 400px;
      background: rgba(0,60,136,0.7);
      color: white;
      border: 0;
      transition: opacity 100ms ease-in;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolVectorTileSourceVectorTileInfoExampleComponent {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;

  readonly format = new MVT<typeof Feature>();
  readonly url = 'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf';
  
  public info?: string;

  onPointerMove(evt: MapBrowserEvent<PointerEvent>): void {
    if (evt.dragging) return;

    const map = this.map.getInstance();
    const features = map.getFeaturesAtPixel(evt.pixel);

    if (features.length === 0) {
      this.info = undefined;
      return;
    }

    this.info = features.length === 0
      ? undefined
      : JSON.stringify(
        features[0].getProperties(),
        null,
        2
      );
  }
}
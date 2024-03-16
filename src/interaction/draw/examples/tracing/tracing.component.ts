import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolSnapInteractionModule } from 'ngx-ol-library/interaction/snap';
import { NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'nol-draw-interaction-tracing-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzSelectModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolXYZSourceModule,
    NolSnapInteractionModule,
    NolDrawInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-13378949, 5943751]" [nolZoom]="11" />
      <nol-tile-layer>
        <nol-xyz-source 
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolMaxZoom]="20"
        />
      </nol-tile-layer>
      <!-- features in this layer will be snapped to -->
      <nol-vector-layer
        [nolStyle]="{
          'fill-color': 'rgba(255, 0, 0, 0.3)',
          'stroke-color': 'rgba(255, 0, 0, 0.9)',
          'stroke-width': 0.5,
        }"
      >
        <nol-vector-source
          #baseVector
          [nolFormat]="format"
          [nolUrl]="'https://openlayers.org/en/latest/examples/data/geojson/fire.json'"
        />
      </nol-vector-layer>
      <!-- this is where the drawn features go -->
      <nol-vector-layer
        [nolStyle]="{
          'stroke-color': 'rgba(100, 255, 0, 1)',
          'stroke-width': 2,
          'fill-color': 'rgba(100, 255, 0, 0.3)',
        }"
      >
        <nol-vector-source #drawVector />
      </nol-vector-layer>

      @if (type !== 'None') {
        <nol-draw-interaction
          [nolActive]="type === 'Polygon'"
          [nolType]="'Polygon'"
          [nolSource]="drawVector.getInstance()"
          [nolTrace]="true"
          [nolTraceSource]="baseVector.getInstance()"
          [nolStyle]="{
            'stroke-color': 'rgba(255, 255, 100, 0.5)',
            'stroke-width': 1.5,
            'fill-color': 'rgba(255, 255, 100, 0.25)',
            'circle-radius': 6,
            'circle-fill-color': 'rgba(255, 255, 100, 0.5)',
          }"
        />
        <nol-snap-interaction [nolSource]="baseVector.getInstance()" />
      }
    </nol-map>
    <div nz-form [nzLayout]="'inline'">
      <nz-form-item>
        <nz-form-label>Geometry type</nz-form-label>
        <nz-form-control>
          <nz-select [(ngModel)]="type">
            <nz-option nzLabel="Polygon" nzValue="Polygon" />
            <nz-option nzLabel="LineString" nzValue="LineString" />
            <nz-option nzLabel="None" nzValue="None" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: [
    `
      :host > div[nz-form] {
        margin-top: 16px;

        nz-select {
          width: 150px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionTracingExampleComponent {

  type: 'Polygon' | 'LineString' | 'None' = 'Polygon';

  // Get your own API key at https://www.maptiler.com/cloud/
  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly format = new GeoJSON();

}

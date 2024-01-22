import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolMultiPointGeometryModule } from 'ngx-ol-library/geom/multi-point';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-multi-point-geometry-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolFeatureModule,
    NolMultiPointGeometryModule,
    NolPointGeometryModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[2784016, -649596]" [nolZoom]="5" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer [nolStyle]="{
        'circle-radius': 8,
        'circle-fill-color': 'red',
        'circle-stroke-color': 'white',
        'circle-stroke-width': 2,
      }">
        <nol-vector-source>
          <nol-feature>
            <nol-multi-point-geometry [nolCoordinates]="[]">
              <nol-point-geometry [nolCoordinates]="[2852612, -841692]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2882438, -302783]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[3130326, -835141]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2769789, -996409]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2437707, -513332]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2521283, -768240]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2808271, -456512]"></nol-point-geometry>
            </nol-multi-point-geometry>
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolMultiPointGeometrySimpleExampleComponent {}
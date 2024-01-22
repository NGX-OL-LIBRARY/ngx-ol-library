import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolLineStringGeometryModule } from 'ngx-ol-library/geom/line-string';
import { NolMultiLineStringGeometryModule } from 'ngx-ol-library/geom/multi-line-string';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-multi-line-string-geometry-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolFeatureModule,
    NolMultiLineStringGeometryModule,
    NolLineStringGeometryModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[6013484, -9867]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer [nolStyle]="{
        'stroke-color': 'green',
        'stroke-width': 1
      }">
        <nol-vector-source>
          <nol-feature>
            <nol-multi-line-string-geometry [nolCoordinates]="[]">
              <nol-line-string-geometry [nolCoordinates]="[[4e6, -2e6], [8e6, 2e6]]" />
              <nol-line-string-geometry [nolCoordinates]="[[4e6, 2e6], [8e6, -2e6]]" />
            </nol-multi-line-string-geometry>
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolMultiLineStringGeometrySimpleExampleComponent {}
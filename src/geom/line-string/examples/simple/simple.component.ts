import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureComponent } from 'ngx-ol-library/feature';
import { NolLineStringGeometryComponent } from 'ngx-ol-library/geom/line-string';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-line-string-geometry-simple-example',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
    NolFeatureComponent,
    NolLineStringGeometryComponent,
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
            <nol-line-string-geometry [nolCoordinates]="[[4e6, -2e6], [8e6, 2e6]]" />
          </nol-feature>
          <nol-feature>
            <nol-line-string-geometry [nolCoordinates]="[[4e6, 2e6], [8e6, -2e6]]" />
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolLineStringGeometrySimpleExampleComponent {}
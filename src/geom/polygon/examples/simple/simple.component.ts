import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureComponent } from 'ngx-ol-library/feature';
import { NolPolygonGeometryComponent } from 'ngx-ol-library/geom/polygon';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-polygon-geometry-simple-example',
  standalone: true,
  imports: [
    NgFor,
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
    NolFeatureComponent,
    NolPolygonGeometryComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="0" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source>
          <nol-feature *ngFor="let coordinates of listOfPolygonCoordinates">
            <nol-polygon-geometry 
              [nolCoordinates]="coordinates" 
              [nolLayout]="'XY'" 
              [nolEnds]="[coordinates.length]" 
            />
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolPolygonGeometrySimpleExampleComponent {

  readonly listOfPolygonCoordinates: number[][] = [
    [
      -654154.8413941638, 
      2416538.85785961, 
      -654154.8413941638, 
      1628602.5173669574, 
      904255.5004814684, 
      1628602.5173669574, 
      904255.5004814684, 
      2416538.85785961, 
      -654154.8413941638, 
      2416538.85785961
    ],
    [
      2658045.47001162, 
      2228313.641577228, 
      2600289.0794256623, 
      993644.6194593736, 
      4204362.301854745, 
      1180706.386139808, 
      2658045.47001162, 
      2228313.641577228
    ],
    [
      2024301.013848723, 
      -608724.1491107482, 
      1973904.2507597057, 
      -1976437.8169190187, 
      2701539.869504338, 
      -2169472.8460460934, 
      3235691.6259208387, 
      -1582399.8459178312, 
      3037397.4626134727, 
      -824112.1190333606, 
      2024301.013848723, 
      -608724.1491107482
    ]
  ];
  
}
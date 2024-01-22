import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureComponent } from 'ngx-ol-library/feature';
import { NolGeometryCollectionComponent } from 'ngx-ol-library/geom/geometry-collection';
import { NolPointGeometryComponent } from 'ngx-ol-library/geom/point';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';
import { FlatCircle } from 'ol/style/flat';

@Component({
  selector: 'nol-geometry-collection-simple-example',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
    NolFeatureComponent,
    NolGeometryCollectionComponent,
    NolPointGeometryComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[2784016, -649596]" [nolZoom]="5" />
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <nol-vector-layer [nolStyle]="style">
        <nol-vector-source>
          <nol-feature>
            <nol-geometry-collection>
              <nol-point-geometry [nolCoordinates]="[2852612, -841692]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2882438, -302783]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[3130326, -835141]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2769789, -996409]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2437707, -513332]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2521283, -768240]"></nol-point-geometry>
              <nol-point-geometry [nolCoordinates]="[2808271, -456512]"></nol-point-geometry>
            </nol-geometry-collection>
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolGeometryCollectionSimpleExampleComponent { 

  readonly style: FlatCircle = {
    "circle-radius": 8,
    "circle-fill-color": 'red',
    "circle-stroke-color": 'white',
    "circle-stroke-width": 2,
  };

}
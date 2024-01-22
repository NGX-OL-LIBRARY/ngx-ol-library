import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolFeatureComponent } from 'ngx-ol-library/feature';
import { NolLinearRingGeometryComponent } from 'ngx-ol-library/geom/linear-ring';
import { NolPolygonGeometryComponent } from 'ngx-ol-library/geom/polygon';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-linear-geometry-simple-example',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
    NolFeatureComponent,
    NolPolygonGeometryComponent,
    NolLinearRingGeometryComponent,
    NzSwitchModule,
    NzSpaceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[2604797, -1389098]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source>
          <nol-feature>
            <nol-polygon-geometry [nolCoordinates]="[]">
              <nol-linear-ring-geometry [nolCoordinates]="outerBoundary" [nolLayout]="'XY'" />
              <ng-container *ngIf="displayHoleLinearRing">
                <nol-linear-ring-geometry [nolCoordinates]="hole" [nolLayout]="'XY'" />
              </ng-container>
            </nol-polygon-geometry>
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
    <nz-space>
      <span *nzSpaceItem>
        <nz-switch [(ngModel)]="displayHoleLinearRing" />
      </span>
      <span *nzSpaceItem>Disply Hole in Polygon</span>
    </nz-space>
  `,
  styles: `
    :host > nol-map {
      margin-bottom: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLinearRingGeometrySimpleExampleComponent {

  outerBoundary: number[] = [
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
  ];
  hole: number[] = [
    2375013.721484384, 
    -1178440.9246937148, 
    2375013.721484384, 
    -1474677.5309426168, 
    2680994.17884983, 
    -1474677.5309426168, 
    2680994.17884983, 
    -1178440.9246937148, 
    2375013.721484384, 
    -1178440.9246937148
  ];

  displayHoleLinearRing = false;

}
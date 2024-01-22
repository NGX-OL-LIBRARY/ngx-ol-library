import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NolFeatureComponent } from 'ngx-ol-library/feature';
import { NolPointGeometryComponent } from 'ngx-ol-library/geom/point';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolVectorSourceComponent } from 'ngx-ol-library/source/vector';
import { NolViewComponent } from 'ngx-ol-library/view';
import { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nol-point-geometry-simple-example',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
    NolVectorLayerComponent,
    NolVectorSourceComponent,
    NolFeatureComponent,
    NolPointGeometryComponent,
    NzButtonModule,
    NzInputNumberModule,
    NzSpaceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="0" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source>
          <nol-feature *ngFor="let point of points">
            <nol-point-geometry [nolCoordinates]="point" />
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
    <nz-space>
      <span *nzSpaceItem>
        <nz-input-number [(ngModel)]="randomCount" />
      </span>
      <span *nzSpaceItem>
        <button nz-button nzType="primary" (click)="addRandomPoints()">Add Random Points</button>
      </span>
    </nz-space>
  `,
  styles: `
    :host > nol-map {
      margin-bottom: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolPointGeometrySimpleExampleComponent implements OnInit {
  
  points: Coordinate[] = [];
  randomCount = 50;

  ngOnInit(): void {
    this.addRandomPoints();
  }

  addRandomPoints(): void {
    const newPoints = (new Array(this.randomCount))
      .fill([0, 0])
      .map(() => fromLonLat([
        this.random(-180, 180),
        this.random(-90, 90)
      ]));
    this.points = [...this.points, ...newPoints];
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
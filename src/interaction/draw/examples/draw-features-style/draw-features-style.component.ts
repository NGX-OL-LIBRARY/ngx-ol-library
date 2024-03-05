import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import { Type as GeometryType } from 'ol/geom/Geometry';
import { FlatStyleLike } from 'ol/style/flat';

@Component({
  selector: 'nol-draw-interaction-draw-features-style-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolOSMSourceModule,
    NolDrawInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-11000000, 4600000]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source [nolWrapX]="false" #vectorSource />
      </nol-vector-layer>
      @for (type of listOfType; track $index) {
        @if (type !== 'None' && type === activeType) {
          <nol-draw-interaction 
            [nolSource]="vectorSource.getInstance()"
            [nolType]="type"
            [nolStyle]="styles[type]"
          />
        }
      }
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Geometry type:</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="activeType">
          @for (type of listOfType; track $index) {
            <nz-option [nzLabel]="type" [nzValue]="type" />
          }
        </nz-select>
      </span>
    </nz-space>
  `,
  styles: [
    `
      :host {
        nz-space {
          margin-top: 16px;
        }

        nz-select {
          width: 120px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionDrawFeaturesStyleExampleComponent {

  listOfType: Array<GeometryType | 'None'> = [
    'Point', 'LineString', 'Polygon', 'Circle', 'None'
  ];
  activeType: GeometryType | 'None' = 'Point';

  readonly styles: Record<string, FlatStyleLike> = {
    Point: {
      'circle-radius': 5,
      'circle-fill-color': 'red',
    },
    LineString: {
      'circle-radius': 5,
      'circle-fill-color': 'red',
      'stroke-color': 'yellow',
      'stroke-width': 2,
    },
    Polygon: {
      'circle-radius': 5,
      'circle-fill-color': 'red',
      'stroke-color': 'yellow',
      'stroke-width': 2,
      'fill-color': 'blue',
    },
    Circle: {
      'circle-radius': 5,
      'circle-fill-color': 'red',
      'stroke-color': 'blue',
      'stroke-width': 2,
      'fill-color': 'yellow',
    },
  };

}

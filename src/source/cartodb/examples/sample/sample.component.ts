import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolSafeAny } from 'ngx-ol-library/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolCartoDBSourceModule } from 'ngx-ol-library/source/cartodb';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-cartodb-source-sample-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolCartoDBSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[8500000, 8500000]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer>
        <nol-cartodb-source [nolAccount]="'documentation'" [nolConfig]="mapConfig" />
      </nol-tile-layer>
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Show european countries larger than</span>
      <span *nzSpaceItem>
        <nz-select [ngModel]="area" (ngModelChange)="setArea($event)">
          <nz-option [nzValue]="0" nzLabel="0 ㎢" />
          <nz-option [nzValue]="5000" nzLabel="5000 ㎢" />
          <nz-option [nzValue]="10000" nzLabel="10000 ㎢" />
          <nz-option [nzValue]="50000" nzLabel="50000 ㎢" />
          <nz-option [nzValue]="100000" nzLabel="100000 ㎢" />
        </nz-select>
      </span>
    </nz-space>
  `,
  styles: `
    :host > nz-space {
      margin-top: 16px;

      nz-select {
        width: 120px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolCartoDBSourceSampleExampleComponent {

  public area = 0;
  public mapConfig: Record<string, NolSafeAny> = {};

  constructor() {
    this.setArea(0);
  }

  setArea(value: number): void {
    this.area = value;
    this.mapConfig = {
      'layers': [
        {
          'type': 'cartodb',
          'options': {
            'cartocss_version': '2.1.1',
            'cartocss': '#layer { polygon-fill: #F00; }',
            'sql': `select * from european_countries_e where area > ${value}`
          },
        },
      ],
    };
  }
}
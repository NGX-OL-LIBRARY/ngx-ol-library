import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NolScaleLineControlModule } from 'ngx-ol-library/control/scale-line';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { Units } from 'ol/control/ScaleLine';

@Component({
  selector: 'nol-scale-line-control-basic-example',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzSelectModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolScaleLineControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      @if (!isBar) {
        <nol-scale-line-control 
          [nolUnits]="units" 
        />
      } @else {
        <nol-scale-line-control 
          [nolUnits]="units"
          [nolBar]="true"
          [nolSteps]="4"
          [nolText]="true"
          [nolMinWidth]="140"
        />
      }
    </nol-map>
    <div nz-form [nzLayout]="'inline'">
      <nz-form-item>
        <nz-form-label>Units</nz-form-label>
        <nz-form-control>
          <nz-select [(ngModel)]="units">
            <nz-option nzLabel="degrees" nzValue="degrees" />
            <nz-option nzLabel="imperial inch" nzValue="imperial" />
            <nz-option nzLabel="us inch" nzValue="us" />
            <nz-option nzLabel="nautical mile" nzValue="nautical" />
            <nz-option nzLabel="metric" nzValue="metric" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Type</nz-form-label>
        <nz-form-control>
          <nz-select [(ngModel)]="isBar">
            <nz-option nzLabel="ScaleLine" [nzValue]="false" />
            <nz-option nzLabel="ScaleBar" [nzValue]="true" />
          </nz-select>
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: `
    :host > div[nz-form] {
      margin-top: 16px;

      nz-select {
        width: 160px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolScaleLineControlBasicExampleComponent {

  units: Units = 'metric';
  isBar = false;

}
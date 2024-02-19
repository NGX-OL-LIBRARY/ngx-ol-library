import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMousePositionControlModule } from 'ngx-ol-library/control/mouse-position';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { createStringXY } from 'ol/coordinate';

@Component({
  selector: 'nol-mouse-position-control-simple-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSpaceModule,
    NzSelectModule,
    NzInputNumberModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolMousePositionControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-mouse-position-control 
        [nolCoordinateFormat]="coordinateFormat"
        [nolProjection]="projection"
        [nolClassName]="'custom-mouse-position'"
        [nolTarget]="mousePosition"
      />
    </nol-map>
    <div class="mouse-position" #mousePosition></div>
    <nz-space [nzAlign]="'center'">
      <span *nzSpaceItem>Projection</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="projection">
          <nz-option nzLabel="EPSG:4326" nzValue="EPSG:4326" />
          <nz-option nzLabel="EPSG:3857" nzValue="EPSG:3857" />
        </nz-select>
      </span>
      <span *nzSpaceItem>Precision</span>
      <span *nzSpaceItem>
        <nz-input-number
          [nzMin]="0"
          [nzMax]="12"
          [ngModel]="precision"
          (ngModelChange)="onPrecisionChange($event)"
        />
      </span>
    </nz-space>
  `,
  styles: `
    :host > .mouse-position {
      margin: 16px 0 8px 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMousePositionControlSimpleExampleComponent {

  projection = 'EPSG:4326';
  precision = 4;
  coordinateFormat = createStringXY(this.precision);

  onPrecisionChange(value: number): void {
    this.coordinateFormat = createStringXY(value);
  }

}
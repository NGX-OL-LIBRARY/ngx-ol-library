import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NolZoomControlModule } from 'ngx-ol-library/control/zoom';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { defaults as defaultControls } from 'ol/control';

@Component({
  selector: 'nol-zoom-control-basic-example',
  standalone: true,
  imports: [
    FormsModule,
    NzCheckboxModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolZoomControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" [nolControls]="controls">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      @if (zoomControlEnabled) {
        <nol-zoom-control />
      }
    </nol-map>
    <span nz-checkbox [(ngModel)]="zoomControlEnabled">Enable zoom control</span>
  `,
  styles: `
    :host > span[nz-checkbox] {
      margin-top: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomControlBasicExampleComponent {

  readonly controls = defaultControls({ zoom: false });

  zoomControlEnabled = true;

}
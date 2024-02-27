import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NolZoomControlModule } from 'ngx-ol-library/control/zoom';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { defaults as defaultControls } from 'ol/control';

@Component({
  selector: 'nol-zoom-control-custom-label-example',
  standalone: true,
  imports: [
    NzIconModule,
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
      <span #zoomIn nz-icon nzType="zoom-in" nzTheme="outline"></span>
      <span #zoomOut nz-icon nzType="zoom-out" nzTheme="outline"></span>
      <nol-zoom-control 
        [nolZoomInLabel]="zoomIn"
        [nolZoomOutLabel]="zoomOut"
      />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomControlCustomLabelExampleComponent {

  readonly controls = defaultControls({ zoom: false });

}
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolTileDebugSourceModule } from 'ngx-ol-library/source/tile-debug';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-tile-debug-source-canvas-tiles-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolTileDebugSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer>
        <nol-tile-debug-source />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolTileDebugSourceCanvasTilesExampleComponent {}
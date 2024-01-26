import { Component } from '@angular/core';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-webgl-tile-layer-webgl-tiles-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolOSMSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="0" />
      <nol-webgl-tile-layer>
        <nol-osm-source />
      </nol-webgl-tile-layer>
    </nol-map>
  `,
})
export class NolWebGLTileLayerWebGLTilesExampleComponent {}
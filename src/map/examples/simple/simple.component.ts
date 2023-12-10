import { Component } from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-map-simple-example',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolOSMSourceComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
    </nol-map>
  `,
})
export class NolMapSimpleExampleComponent {}
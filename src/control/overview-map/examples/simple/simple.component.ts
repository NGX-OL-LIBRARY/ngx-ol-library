import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolOverviewMapControlModule } from 'ngx-ol-library/control/overview-map';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-overview-map-control-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolOverviewMapControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[500000, 6000000]" [nolZoom]="7" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-overview-map-control>
        <nol-tile-layer>
          <nol-osm-source />
        </nol-tile-layer>
      </nol-overview-map-control>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOverviewMapControlSimpleExampleComponent {}
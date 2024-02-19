import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolAttributionControlModule } from 'ngx-ol-library/control/attribution';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { defaults as defaultControls } from 'ol/control';

@Component({
  selector: 'nol-attribution-control-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolAttributionControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" [nolControls]="controls">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-attribution-control [nolCollapsible]="false" />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolAttributionControlSimpleExampleComponent {

  readonly controls = defaultControls({ attribution: false });

}
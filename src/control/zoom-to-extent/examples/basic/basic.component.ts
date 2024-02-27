import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolZoomToExtentControlModule } from 'ngx-ol-library/control/zoom-to-extent';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-zoom-to-extent-control-basic-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolZoomToExtentControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-zoom-to-extent-control
        [nolExtent]="[
          -572513.341856, 
          5211017.966314, 
          916327.095083, 
          6636950.728974
        ]"
      />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolZoomToExtentControlBasicExampleComponent {}
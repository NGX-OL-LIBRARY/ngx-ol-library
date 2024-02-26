import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolDragRotateAndZoomInteractionModule } from 'ngx-ol-library/interaction/drag-rotate-and-zoom';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-drag-rotate-and-zoom-interaction-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolDragRotateAndZoomInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-drag-rotate-and-zoom-interaction />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolDragRotateAndZoomInteractionSimpleExampleComponent {}
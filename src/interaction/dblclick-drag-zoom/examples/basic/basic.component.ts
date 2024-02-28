import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDblClickDragZoomInteractionModule } from 'ngx-ol-library/interaction/dblclick-drag-zoom';

@Component({
  selector: 'nol-dblclick-drag-zoom-interaction-basic-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolDblClickDragZoomInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-dblclick-drag-zoom-interaction />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDblClickDragZoomInteractionBasicExampleComponent {

}

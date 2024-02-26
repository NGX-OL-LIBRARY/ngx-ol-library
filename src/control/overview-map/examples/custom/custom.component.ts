import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NolOverviewMapControlModule } from 'ngx-ol-library/control/overview-map';
import { NolDragRotateAndZoomInteractionModule } from 'ngx-ol-library/interaction/drag-rotate-and-zoom';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-overview-map-control-custom-example',
  standalone: true,
  imports: [
    FormsModule,
    NzCheckboxModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolOverviewMapControlModule,
    NolDragRotateAndZoomInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[500000, 6000000]" [nolZoom]="7" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-overview-map-control
        [nolClassName]="'ol-overviewmap ol-custom-overviewmap'"
        [nolCollapseLabel]="'\u00BB'"
        [nolLabel]="'\u00AB'"
        [nolCollapsed]="false"
        [nolRotateWithView]="rotateWithView"
      >
        <nol-tile-layer>
          <nol-osm-source 
            [nolUrl]="'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=' + apikey"
          />
        </nol-tile-layer>
      </nol-overview-map-control>
      <nol-drag-rotate-and-zoom-interaction />
    </nol-map>
    <div class="checkbox">
      <span nz-checkbox [(ngModel)]="rotateWithView">Rotate with view</span>
    </div>
  `,
  styles: `
    .ol-custom-overviewmap,
    .ol-custom-overviewmap.ol-uncollapsible {
      bottom: auto;
      left: auto;
      right: 0;
      top: 0;
    }

    .ol-custom-overviewmap:not(.ol-collapsed)  {
      border: 1px solid black;
    }

    .ol-custom-overviewmap .ol-overviewmap-map {
      border: none;
      width: 300px;
    }

    .ol-custom-overviewmap .ol-overviewmap-box {
      border: 2px solid red;
    }

    .ol-custom-overviewmap:not(.ol-collapsed) button{
      bottom: auto;
      left: auto;
      right: 1px;
      top: 1px;
    }

    .checkbox {
      margin-top: 16px;
    }
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOverviewMapControlCustomExampleComponent {

  rotateWithView = false;
  // Your API key from https://www.thunderforest.com/docs/apikeys/ here
  readonly apikey = '0e6fc415256d4fbb9b5166a718591d71';

}
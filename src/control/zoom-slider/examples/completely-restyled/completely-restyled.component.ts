import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NolZoomSliderControlModule } from 'ngx-ol-library/control/zoom-slider';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-zoom-slider-control-completely-restyled-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolZoomSliderControlModule,
  ],
  template: `
    <nol-map class="completely-restyled-zoom-slider" [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-zoom-slider-control />
    </nol-map>
  `,
  styles: `
    .completely-restyled-zoom-slider {
      .ol-zoomslider {
        top: 8px;
        left: auto;
        right: 8px;
        background-color: rgba(255,69,0,0.2);
        width: 200px;
        height: 15px;
        padding: 0;
        box-shadow: 0 0 5px rgb(255,69,0);
        border-radius: 7.5px;
      }

      .ol-zoomslider:hover {
        background-color: rgba(255,69,0,0.3);
      }

      .ol-zoomslider-thumb {
        height: 15px;
        width: 15px;
        margin: 0;
        filter: none;
        background-color: rgba(255,69,0,0.6);
        border-radius: 7.5px;
      }
      a.ol-zoomslider-handle:hover {
        background-color: rgba(255,69,0,0.7);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NolZoomSliderControlCompletelyRestyledExampleComponent {}
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NolZoomSliderControlModule } from 'ngx-ol-library/control/zoom-slider';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-zoom-slider-control-placed-between-zoom-controls-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolZoomSliderControlModule,
  ],
  template: `
    <nol-map class="placed-between-zoom-controls" [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-zoom-slider-control />
    </nol-map>
  `,
  styles: `
    .placed-between-zoom-controls {
      .ol-zoom .ol-zoom-out {
        margin-top: 200px;
      }

      .ol-zoomslider {
        background-color: transparent;
        /*
        Zoom control top: 0.5em
        Zoom control padding: 2px
        Zoom in button margin top: 1px
        Zoom in button height: font size 1.14em * 1.375 height
        */
        top: calc(0.5em + 2px + 1px + 1.14 * 1.375em);
      }

      .ol-touch .ol-zoom .ol-zoom-out {
        margin-top: 212px;
      }

      .ol-touch .ol-zoomslider {
        top: 2.75em;
      }

      .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
      .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
        top: 3px;
      }

      .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
      .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
        top: 232px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NolZoomSliderControlPlacedBetweenZoomControlsExampleComponent {}
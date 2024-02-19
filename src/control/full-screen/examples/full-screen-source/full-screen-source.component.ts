import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFullScreenControlModule } from 'ngx-ol-library/control/full-screen';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-full-screen-control-full-screen-source-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolFullScreenControlModule,
  ],
  template: `
    <div class="fullscreen" #fullscreen>
      <nol-map>
        <nol-view [nolCenter]="[-9101767, 2822912]" [nolZoom]="14" />
        <nol-tile-layer>
          <nol-osm-source />
        </nol-tile-layer>
        <nol-full-screen-control [nolSource]="fullscreen" />
      </nol-map>
      <div class="sidepanel">
        <span class="sidepanel-title">Side Panel</span>
      </div>
    </div>
  `,
  styles: `
    :host > .fullscreen {
      display: flex;
      align-items: stretch;
      width: 100%;
      height: 400px;

      &:-webkit-full-screen {
        height: 100%;
      }

      &:fullscreen {
        height: 100%;
      }

      > nol-map {
        width: 80%;
      }

      > .sidepanel {
        background: #1F6B75;
        width: 20%;

        > .sidepanel-title {
          width: 100%;
          font-size: 3em;
          color: #ffffff;
          display: block;
          text-align: center;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolAttributionControlFullScreenSourceExampleComponent {}
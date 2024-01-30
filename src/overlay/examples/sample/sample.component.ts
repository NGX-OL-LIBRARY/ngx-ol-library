import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOverlayModule } from 'ngx-ol-library/overlay';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'nol-overlay-sample-example',
  standalone: true,
  imports: [
    NzTypographyModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolOverlayModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolClick)="onClick($event)">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <!-- Popup showing the position the user clicked -->
      @if (coordinate) {
        <nol-overlay 
          [nolPosition]="coordinate" 
          [nolPositioning]="'bottom-center'"
        >
          <div class="popover">
            <div class="popover-arrow"></div>
            <div class="popover-header">Welcome to OpenLayers</div>
            <div class="popover-body" nz-typography>
              <p>The location you clicked was:</p>
              <code>{{ coordinate | toLonLat }}</code>
            </div>
          </div>
        </nol-overlay>
      }
      <!-- Vienna marker -->
      <nol-overlay
        [nolPosition]="[16.3725, 48.208889] | fromLonLat"
        [nolPositioning]="'center-center'"
        [nolStopEvent]="false"
      >
        <div class="marker"></div>
      </nol-overlay>
      <!-- Vienna label -->
      <nol-overlay [nolPosition]="[16.3725, 48.208889] | fromLonLat">
        <a 
          class="vienna" 
          href="https://en.wikipedia.org/wiki/Vienna"
          target="_blank"
        >Vienna</a>
      </nol-overlay>
    </nol-map>
  `,
  styles: `
    :host {
      .marker {
        width: 20px;
        height: 20px;
        border: 1px solid #088;
        border-radius: 10px;
        background-color: #0FF;
        opacity: 0.5;
      }

      .vienna {
        text-decoration: none;
        color: white;
        font-size: 11pt;
        font-weight: bold;
        text-shadow: black 0.1em 0.1em 0.2em;
      }

      .popover {
        position: relative;
        margin-bottom: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.175);
        border-radius: 0.5rem;
        background-color: #fff;
        background-clip: padding-box;

        &-arrow {
          position: absolute;
          left: calc(50% - 1rem / 2);
          bottom: -0.5rem; 
          width: 1rem;
          height: 0.5rem;

          &::before,
          &::after {
            position: absolute;
            display: block;
            content: "";
            border-color: transparent;
            border-style: solid;
            border-width: 0.5rem calc(1rem * .5) 0;
          }

          &::before {
            bottom: 0;
            border-top-color: rgba(0, 0, 0, 0.175);
          }

          &::after {
            bottom: 1px;
            border-top-color: #fff;
          }
        }

        &-header {
          padding: 0.5rem 1rem;
          margin-bottom: 0;
          font-size: 1rem;
          font-weight: 700;
          background-color: #f0f0f0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.175);
          border-top-left-radius: calc(0.5rem - 1px);
          border-top-right-radius: calc(0.5rem - 1px);
        }

        &-body {
          min-width: 276px;
          color: #212529;
          padding: 1rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOverlaySampleExampleComponent {

  coordinate?: Coordinate;

  onClick(evt: MapBrowserEvent<PointerEvent>): void {
    this.coordinate = evt.coordinate;
  }
}
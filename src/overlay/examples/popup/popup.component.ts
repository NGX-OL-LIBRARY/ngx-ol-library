import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOverlayModule } from 'ngx-ol-library/overlay';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'nol-overlay-popup-example',
  standalone: true,
  imports: [
    NzTypographyModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolXYZSourceModule,
    NolOverlayModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolSingleclick)="onSingleClick($event)">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-xyz-source
          [nolAttributions]="attributions"
          [nolUrl]="'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + maptilerKey"
          [nolTileSize]="512"
        />
      </nol-tile-layer>
      @if (coordinate) {
        <nol-overlay
          [nolPosition]="coordinate"
          [nolAutoPan]="{
            animation: {
              duration: 250,
            },
          }"
        >
          <div class="popup">
            <button class="popup-closer" (click)="closePopup()">✖</button>
            <div class="popup-content" nz-typography>
              <p>You clicked here:</p>
              <code>{{ coordinate | nolToLonLat }}</code>
            </div>
          </div>
        </nol-overlay>
      }
    </nol-map>
  `,
  styles: `
    :host .popup {
      position: absolute;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      bottom: 12px;
      left: -50px;
      min-width: 280px;

      &::after,
      &::before {
        top: 100%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &::after {
        border-top-color: white;
        border-width: 10px;
        left: 48px;
        margin-left: -10px;
      }

      &::before {
        border-top-color: #cccccc;
        border-width: 11px;
        left: 48px;
        margin-left: -11px;
      }

      &-closer {
        text-decoration: none;
        position: absolute;
        top: 2px;
        right: 8px;
        color: #6698ff;
        border: 0;
        background-color: transparent;
        cursor: pointer;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOverlayPopupExampleComponent {

  // Get your own API key at https://www.maptiler.com/cloud/
  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  public coordinate?: Coordinate;

  onSingleClick(evt: MapBrowserEvent<PointerEvent>): void {
    this.coordinate = evt.coordinate;
  }

  closePopup(): void {
    this.coordinate = undefined;
  }
}
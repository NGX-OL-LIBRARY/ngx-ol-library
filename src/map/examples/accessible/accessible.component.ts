import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';

@Component({
  selector: 'nol-map-accessible-example',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
  ],
  template: `
    <nol-map #map [nolHeight]="'400px'" [nolTabIndex]="0">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
    </nol-map>
    <nz-space>
      <button *nzSpaceItem nz-button (click)="zoomOut()">Zoom out</button>
      <button *nzSpaceItem nz-button (click)="zoomIn()">Zoom in</button>
    </nz-space>
  `,
  styles: [
    `
      :host {
        > nz-space {
          margin-top: 16px;
        }

        > nol-map:focus {
          outline: #4A74A8 solid 0.15em;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolMapAccessibleExampleComponent {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;

  zoomIn(): void {
    const view = this.map.getInstance().getView();
    const zoom = view.getZoom() as number;
    view.setZoom(zoom + 1);
  }

  zoomOut(): void {
    const view = this.map.getInstance().getView();
    const zoom = view.getZoom() as number;
    view.setZoom(zoom - 1);
  }

}

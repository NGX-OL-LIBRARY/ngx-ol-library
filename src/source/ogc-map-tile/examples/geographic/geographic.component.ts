import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOGCMapTileSourceComponent } from 'ngx-ol-library/source/ogc-map-tile';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-ogc-map-tile-source-geographic-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOGCMapTileSourceComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolProjection]="'EPSG:4326'" [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-tile-layer>
        <nol-ogc-map-tile-source 
          [nolUrl]="'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WorldCRS84Quad'"
        />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOGCMapTileSourceGeographicExampleComponent {}
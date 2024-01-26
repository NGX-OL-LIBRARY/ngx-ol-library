import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolTileWMSSourceModule } from 'ngx-ol-library/source/tile-wms';
import { NolViewModule } from 'ngx-ol-library/view';
import TileGrid from 'ol/tilegrid/TileGrid';
import { Projection, get as getProjection } from 'ol/proj';
import { getWidth } from 'ol/extent';

@Component({
  selector: 'nol-tile-wms-source-custom-tilegrid-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolTileWMSSourceModule,
  ],
  template: `
    <nol-map nolHeight="400px">
      <nol-view [nolCenter]="[-10997148, 4569099]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer [nolExtent]="[-13884991, 2870341, -7455066, 6338219]">
        <nol-tile-wms-source
          [nolUrl]="'https://ahocevar.com/geoserver/wms'"
          [nolParams]="{
            'LAYERS': 'topp:states', 
            'TILED': true
          }"
          [nolServerType]="'geoserver'"
          [nolTileGrid]="tileGrid" 
        />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileWMSSourceCustomTileGridExampleComponent {

  readonly tileGrid: TileGrid;

  constructor() {
    const proj = getProjection('EPSG:3857') as Projection;
    const projExtent = proj.getExtent();
    const startResolution = getWidth(projExtent) / 256;
    const resolutions = new Array(22);

    for (let i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i);
    }

    this.tileGrid = new TileGrid({
      extent: [-13884991, 2870341, -7455066, 6338219],
      resolutions: resolutions,
      tileSize: [512, 256],
    });
  }

}
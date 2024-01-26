import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolTileWMSSourceModule } from 'ngx-ol-library/source/tile-wms';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-tile-wms-source-wrapping-example',
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
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer>
        <nol-tile-wms-source
          [nolUrl]="'https://ahocevar.com/geoserver/ne/wms'"
          [nolParams]="{
            'LAYERS': 'ne:ne_10m_admin_0_countries', 
            'TILED': true
          }"
          [nolServerType]="'geoserver'"
        />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileWMSSourceWrappingExampleComponent {}
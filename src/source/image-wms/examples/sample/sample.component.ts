import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolImageWMSSourceModule } from 'ngx-ol-library/source/image-wms';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-image-wms-source-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolImageLayerModule,
    NolOSMSourceModule,
    NolImageWMSSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-10997148, 4569099]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-image-layer [nolExtent]="[-13884991, 2870341, -7455066, 6338219]">
        <nol-image-wms-source
          [nolUrl]="'https://ahocevar.com/geoserver/wms'"
          [nolParams]="{
            'LAYERS': 'topp:states'
          }"
          [nolRatio]="1"
          [nolServerType]="'geoserver'"
        />
      </nol-image-layer>
    </nol-map>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageWMSSourceSampleExampleComponent {}
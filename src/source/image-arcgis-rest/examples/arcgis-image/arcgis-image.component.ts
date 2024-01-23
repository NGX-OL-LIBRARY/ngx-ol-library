import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolImageArcGISRestSourceModule } from 'ngx-ol-library/source/image-arcgis-rest';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-image-arcgis-rest-source-arcgis-image-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolImageLayerModule,
    NolOSMSourceModule,
    NolImageArcGISRestSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-10997148, 4569099]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-image-layer>
        <nol-image-arcgis-rest-source
          [nolRatio]="1"
          [nolParams]="{}"
          [nolUrl]="'https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/USA/MapServer'"
        />
      </nol-image-layer>
    </nol-map>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolImageArcGISRestSourceArcGISImageExampleComponent {}
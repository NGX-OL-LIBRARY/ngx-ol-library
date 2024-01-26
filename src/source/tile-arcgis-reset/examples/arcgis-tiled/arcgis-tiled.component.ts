import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolTileArcGISRestSourceModule } from 'ngx-ol-library/source/tile-arcgis-reset';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-tile-arcgis-reset-source-arcgis-tiled-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolTileArcGISRestSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-10997148, 4569099]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer [nolExtent]="[-13884991, 2870341, -7455066, 6338219]">
        <nol-tile-arcgis-reset-source [nolUrl]="url" />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolTileArcGISRestSourceArcGISTiledExampleComponent {

  readonly url =
    'https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/' +
    'USA/MapServer';
}
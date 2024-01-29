import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolWMTSSourceModule } from 'ngx-ol-library/source/wmts';
import { NolViewModule } from 'ngx-ol-library/view';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { Projection, get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';

@Component({
  selector: 'nol-wmts-source-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolWMTSSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-11158582, 4813697]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer [nolOpacity]="0.7">
        <nol-wmts-source
          [nolAttributions]="attributions"
          [nolUrl]="'https://mrdata.usgs.gov/mapcache/wmts'"
          [nolLayer]="'sgmc2'"
          [nolMatrixSet]="'GoogleMapsCompatible'"
          [nolFormat]="'image/png'"
          [nolProjection]="projection"
          [nolTileGrid]="tileGrid"
          [nolStyle]="'default'"
          [nolWrapX]="true"
        />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolWMTSSourceSampleExampleComponent {

  readonly attributions: string;
  readonly tileGrid: WMTSTileGrid;
  readonly projection: Projection;

  constructor() {
    const projection = getProjection('EPSG:3857') as Projection;
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);

    for (let z = 0; z < 19; ++z) {
      // generate resolutions and matrixIds arrays for this WMTS
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }

    this.projection = projection;
    this.tileGrid = new WMTSTileGrid({
      origin: getTopLeft(projectionExtent),
      resolutions: resolutions,
      matrixIds: matrixIds,
    });
    this.attributions = 
      'Tiles © <a href="https://mrdata.usgs.gov/geology/state/"' +
      ' target="_blank">USGS</a>'
  }
}
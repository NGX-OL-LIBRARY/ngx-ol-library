import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolWMTSSourceModule } from 'ngx-ol-library/source/wmts';
import { NolViewModule } from 'ngx-ol-library/view';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { Projection, get as getProjection } from 'ol/proj';
import { getTopLeft, getWidth } from 'ol/extent';

@Component({
  selector: 'nol-wmts-source-dimensions-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSliderModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolWMTSSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view 
        [nolProjection]="projection" 
        [nolCenter]="[-9871995, 3566245]" 
        [nolZoom]="6" 
      />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-tile-layer [nolOpacity]=".7">
        <nol-wmts-source
          [nolUrl]="'https://ts2.scalgo.com/olpatch/wmts?token=' + scalgoToken"
          [nolLayer]="'SRTM_4_1:SRTM_4_1_flooded_sealevels'"
          [nolFormat]="'image/png'"
          [nolMatrixSet]="'EPSG:3857'"
          [nolAttributions]="attributions"
          [nolTileGrid]="tileGrid"
          [nolStyle]="'default'"
          [nolDimensions]="dimensions"
        />
      </nol-tile-layer>
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Sea-level</span>
      <span *nzSpaceItem>
        <nz-slider
          [nzMin]="-1"
          [nzMax]="100"
          [ngModel]="dimensions.threshold"
          (ngModelChange)="onSliderValueChange($event)"
        />
      </span>
      <span *nzSpaceItem>{{ dimensions.threshold }} meters</span>
    </nz-space>
  `,
  styles: `
    :host > nz-space {
      margin-top: 16px;

      nz-slider {
        display: block;
        width: 200px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolWMTSSourceDimensionsExampleComponent {

  readonly scalgoToken = 'CC5BF28A7D96B320C7DFBFD1236B5BEB';
  readonly attributions: string;
  readonly projection: Projection;
  readonly tileGrid: WMTSTileGrid;

  public dimensions = { threshold: 10 };

  constructor() {
    // create the WMTS tile grid in the google projection
    const projection = getProjection('EPSG:3857') as Projection;
    const tileSizePixels = 256;
    const tileSizeMtrs = getWidth(projection.getExtent()) / tileSizePixels;
    const matrixIds: string[] = [];
    const resolutions = [];

    for (let i = 0; i <= 14; i++) {
      matrixIds[i] = `${i}`;
      resolutions[i] = tileSizeMtrs / Math.pow(2, i);
    }

    this.projection = projection;
    this.tileGrid = new WMTSTileGrid({
      origin: getTopLeft(projection.getExtent()),
      resolutions: resolutions,
      matrixIds: matrixIds,
    });
    this.attributions = '<a href="https://scalgo.com" target="_blank">SCALGO</a>',
      '<a href="https://cgiarcsi.community/data/' +
      'srtm-90m-digital-elevation-database-v4-1"' +
      ' target="_blank">CGIAR-CSI SRTM</a>';
  }

  onSliderValueChange(value: number): void {
    this.dimensions = { threshold: value };
  }
}
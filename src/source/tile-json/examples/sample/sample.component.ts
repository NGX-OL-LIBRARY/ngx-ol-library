import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolTileJSONSourceModule } from 'ngx-ol-library/source/tile-json';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-tile-json-source-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolTileJSONSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-tile-json-source
          [nolUrl]="'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad?f=tilejson'"
          [nolCrossOrigin]="'anonymous'"
        />
      </nol-tile-layer>
    </nol-map>
  `,
  styles: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileJSONSourceSampleExampleComponent {}
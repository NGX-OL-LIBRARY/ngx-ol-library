import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolVectorTileLayerModule } from 'ngx-ol-library/layer/vector-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOGCVectorTileSourceModule } from 'ngx-ol-library/source/ogc-vector-tile';
import { NolViewModule } from 'ngx-ol-library/view';
import { Feature } from 'ol';
import MVT from 'ol/format/MVT';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

@Component({
  selector: 'nol-ogc-vector-tile-source-ogc-vector-tiles-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolVectorTileLayerModule,
    NolOGCVectorTileSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-vector-tile-layer [nolBackground]="'#d1d1d1'" [nolStyle]="style">
        <nol-ogc-vector-tile-source [nolUrl]="url" [nolFormat]="format" />
      </nol-vector-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolOGCVectorTileSourceOGCVectorTilesExampleComponent {

  readonly url = 'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:' +
    'cultural:ne_10m_admin_0_countries/tiles/WebMercatorQuad';
  readonly format = new MVT<typeof Feature>();
  readonly style = new Style({
    stroke: new Stroke({
      width: 0.6,
      color: '#8c8b8b',
    }),
    fill: new Fill({
      color: '#f7f7e9'
    }),
  });

}
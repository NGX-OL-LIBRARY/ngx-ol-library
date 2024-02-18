import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NolGraticuleLayerModule } from 'ngx-ol-library/layer/graticule';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';
import { Projection } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4.js';

proj4.defs(
  'ESRI:53009',
  '+proj=moll +lon_0=0 +x_0=0 +y_0=0 +a=6371000 ' +
    '+b=6371000 +units=m +no_defs'
);
register(proj4);

@Component({
  selector: 'nol-graticule-layer-sphere-mollweide-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolGraticuleLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" [nolKeyboardEventTarget]="document">
      <nol-view
        [nolCenter]="[0, 0]"
        [nolProjection]="sphereMollweideProjection"
        [nolZoom]="2"
      />
      <nol-vector-layer
        [nolStyle]="{
          'fill-color': [
            'string', ['get', 'COLOR_BIO'], 
            '#eee'
          ],
        }"
      >
        <nol-vector-source 
          [nolUrl]="'https://openlayers.org/data/vector/ecoregions.json'"
          [nolFormat]="format"
        />
      </nol-vector-layer>
      <nol-graticule-layer />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolGraticuleLayerSphereMollweideExampleComponent {

  readonly document = inject(DOCUMENT);
  // Configure the Sphere Mollweide projection object with an extent,
  // and a world extent. These are required for the Graticule.
  readonly sphereMollweideProjection = new Projection({
    code: 'ESRI:53009',
    extent: [
      -18019909.21177587, 
      -9009954.605703328, 
      18019909.21177587,
      9009954.605703328,
    ],
    worldExtent: [-179, -89.99, 179, 89.99],
  });

  readonly format = new GeoJSON();


}
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolCircleStyleModule } from 'ngx-ol-library/style/circle';
import { NolFillStyleModule } from 'ngx-ol-library/style/fill';
import { NolStrokeStyleModule } from 'ngx-ol-library/style/stroke';
import { NolStyleModule } from 'ngx-ol-library/style/style';
import { NolTextStyleModule } from 'ngx-ol-library/style/text';
import { NolViewModule } from 'ngx-ol-library/view';
import { Coordinate } from 'ol/coordinate';
import { TextJustify } from 'ol/style/Text';

@Component({
  selector: 'nol-text-style-vector-labels-justify-text-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolFeatureModule,
    NolPointGeometryModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolOSMSourceModule,
    NolStyleModule,
    NolCircleStyleModule,
    NolFillStyleModule,
    NolStrokeStyleModule,
    NolTextStyleModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-8150000, 6025000]" [nolZoom]="8" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source>
          @for (item of data; track item.coordinate) {
            <nol-feature>
              <nol-point-geometry [nolCoordinates]="item.coordinate" />
              <nol-style>
                <nol-circle-style [nolRadius]="10">
                  <nol-fill-style [nolColor]="'rgba(255, 0, 0, 0.1)'" />
                  <nol-stroke-style [nolColor]="'red'" [nolWidth]="1" />
                </nol-circle-style>
                <nol-text-style
                  [nolFont]="'16px sans-serif'"
                  [nolTextAlign]="item.textAlign"
                  [nolJustify]="item.justify"
                  [nolText]="'Justify text inside box\ntextAlign: ' + item.textAlign + (item.justify ? '\njustify: ' + item.justify : '')"
                  [nolPadding]="[2, 2, 2, 2]"
                >
                  <nol-fill-style [nolColor]="[255, 255, 255, 1]" />
                  <nol-text-background-fill>
                    <nol-fill-style [nolColor]="[168, 50, 153, 0.6]" />
                  </nol-text-background-fill>
                </nol-text-style>
              </nol-style>
            </nol-feature>
          }
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolTextStyleVectorLabelsJustifyTextExampleComponent {

  readonly data: Array<{
    coordinate: Coordinate;
    textAlign: CanvasTextAlign;
    justify?: TextJustify;
  }> = [
    {
      coordinate: [-8300000, 6095000],
      textAlign: 'left',
    },
    {
      coordinate: [-8150000, 6095000],
      textAlign: 'center',
    },
    {
      coordinate: [-8000000, 6095000],
      textAlign: 'right',
    },
    {
      coordinate: [-8300000, 6025000],
      textAlign: 'left',
      justify: 'center',
    },
    {
      coordinate: [-8150000, 6025000],
      textAlign: 'center',
      justify: 'center',
    },
    {
      coordinate: [-8000000, 6025000],
      textAlign: 'right',
      justify: 'center',
    },
    {
      coordinate: [-8300000, 5955000],
      textAlign: 'left',
      justify: 'left',
    },
    {
      coordinate: [-8150000, 5955000],
      textAlign: 'center',
      justify: 'left',
    },
    {
      coordinate: [-8000000, 5955000],
      textAlign: 'right',
      justify: 'left',
    },
  ];
}
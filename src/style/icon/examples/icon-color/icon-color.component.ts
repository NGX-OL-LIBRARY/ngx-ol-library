import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolOGCMapTileSourceModule } from 'ngx-ol-library/source/ogc-map-tile';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolIconStyleModule } from 'ngx-ol-library/style/icon';
import { NolStyleModule } from 'ngx-ol-library/style/style';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-icon-style-icon-color-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOGCMapTileSourceModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolFeatureModule,
    NolPointGeometryModule,
    NolStyleModule,
    NolIconStyleModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[2.896372, 44.6024] | nolFromLonLat" [nolZoom]="3" />
      <nol-tile-layer>
        <nol-ogc-map-tile-source 
          [nolUrl]="'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad'"
          [nolCrossOrigin]="''"
        />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source>
          <nol-feature>
            <nol-point-geometry [nolCoordinates]="[12.5, 41.9] | nolFromLonLat" />
            <nol-style>
              <nol-icon-style 
                [nolColor]="'#BADA55'"
                [nolCrossOrigin]="'crossOrigin'"
                [nolSrc]="'https://openlayers.org/en/latest/examples/data/square.svg'"
              />
            </nol-style>
          </nol-feature>
          <nol-feature>
            <nol-point-geometry [nolCoordinates]="[-0.12755, 51.507222] | nolFromLonLat" />
            <nol-style>
              <nol-icon-style 
                [nolColor]="'rgba(255, 0, 0, .5)'"
                [nolCrossOrigin]="'crossOrigin'"
                [nolSrc]="'https://openlayers.org/en/latest/examples/data/bigdot.png'"
                [nolScale]="0.2"
              />
            </nol-style>
          </nol-feature>
          <nol-feature>
            <nol-point-geometry [nolCoordinates]="[-3.683333, 40.4] | nolFromLonLat" />
            <nol-style>
              <nol-icon-style 
                [nolCrossOrigin]="'crossOrigin'"
                [nolSrc]="'https://openlayers.org/en/latest/examples/data/bigdot.png'"
                [nolScale]="0.2"
              />
            </nol-style>
          </nol-feature>
          <nol-feature>
            <nol-point-geometry [nolCoordinates]="[2.353, 48.8566] | nolFromLonLat" />
            <nol-style>
              <nol-icon-style 
                [nolColor]="'#8959A8'"
                [nolCrossOrigin]="'crossOrigin'"
                [nolSrc]="'https://openlayers.org/en/latest/examples/data/dot.svg'"
              />
            </nol-style>
          </nol-feature>
          <nol-feature>
            <nol-point-geometry [nolCoordinates]="[13.3884, 52.5169] | nolFromLonLat" />
            <nol-style>
              <nol-icon-style 
                [nolCrossOrigin]="'crossOrigin'"
                [nolSrc]="'https://openlayers.org/en/latest/examples/data/dot.svg'"
              />
            </nol-style>
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolIconStyleIconColorExampleComponent {

}
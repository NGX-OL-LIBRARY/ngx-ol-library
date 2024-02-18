import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolGraticuleLayerModule } from 'ngx-ol-library/layer/graticule';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolViewModule } from 'ngx-ol-library/view';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'nol-graticule-layer-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolGraticuleLayerModule,
    NolOSMSourceModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[4.8, 47.75] | fromLonLat" [nolZoom]="5" />
      <nol-tile-layer>
        <nol-osm-source [nolWrapX]="false" />
      </nol-tile-layer>
      <nol-graticule-layer 
        [nolStrokeStyle]="strokeStyle"
        [nolShowLabels]="true"
        [nolWrapX]="false"
      />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGraticuleLayerSampleExampleComponent {

  readonly strokeStyle = new Stroke({
    color: 'rgba(255,120,0,0.9)',
    width: 2,
    lineDash: [0.5, 4],
  });
}
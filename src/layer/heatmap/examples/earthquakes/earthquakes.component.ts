import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolHeatmapLayerModule } from 'ngx-ol-library/layer/heatmap';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolStadiaMapsSourceModule } from 'ngx-ol-library/source/stadia-maps';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';
import { FeatureLike } from 'ol/Feature';
import KML from 'ol/format/KML';

@Component({
  selector: 'nol-heatmap-layer-earthquakes-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSpaceModule,
    NzSliderModule,
    NolMapModule,
    NolViewModule,
    NolHeatmapLayerModule,
    NolTileLayerModule,
    NolStadiaMapsSourceModule,
    NolVectorSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-stadia-maps-source [nolLayer]="'stamen_toner'" />
      </nol-tile-layer>
      <nol-heatmap-layer [nolBlur]="blur" [nolRadius]="radius" [nolWeight]="weight">
        <nol-vector-source
          [nolUrl]="'https://openlayers.org/en/latest/examples/data/kml/2012_Earthquakes_Mag5.kml'"
          [nolFormat]="format"
        />
      </nol-heatmap-layer>
    </nol-map>
    <nz-space [nzAlign]="'center'">
      <span *nzSpaceItem>radius size</span>
      <span *nzSpaceItem>
        <nz-slider [nzMin]="1" [nzMax]="50" [nzStep]="1" [(ngModel)]="radius" />
      </span>
      <span *nzSpaceItem>blur size</span>
      <span *nzSpaceItem>
        <nz-slider [nzMin]="1" [nzMax]="50" [nzStep]="1" [(ngModel)]="blur" />
      </span>
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
export class NolHeatmapLayerEarthquakesExampleComponent {

  radius = 5;
  blur = 15;

  readonly format = new KML({
    extractStyles: false,
  });
  readonly weight = (feature: FeatureLike) => {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    const name = feature.get('name');
    const magnitude = parseFloat(name.substr(2));
    return magnitude - 5;
  };
}
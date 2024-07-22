import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolStadiaMapsSourceModule } from 'ngx-ol-library/source/stadia-maps';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-stadia-maps-source-stamen-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolStadiaMapsSourceModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-122.416667, 37.783333] | nolFromLonLat" [nolZoom]="12" />
      <nol-tile-layer>
        <nol-stadia-maps-source [nolLayer]="'stamen_watercolor'" />
      </nol-tile-layer>
      <nol-tile-layer>
        <nol-stadia-maps-source [nolLayer]="'stamen_terrain_labels'" />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolStadiaMapsSourceStamenExampleComponent {
  // NOTE: Layers from Stadia Maps do not require an API key for localhost development or most production
  // web deployments. See https://docs.stadiamaps.com/authentication/ for details.
}
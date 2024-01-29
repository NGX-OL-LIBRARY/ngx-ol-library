import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolStadiaMapsSourceModule } from 'ngx-ol-library/source/stadia-maps';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-stadia-maps-source-retina-tiles-example',
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
      <nol-view [nolCenter]="[24.750645, 59.444351] | fromLonLat" [nolZoom]="14" />
      <nol-tile-layer>
        <nol-stadia-maps-source 
          [nolLayer]="'alidade_smooth_dark'"
          [nolRetina]="true"
        />
      </nol-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolStadiaMapsSourceRetinaTilesExampleComponent {
  // NOTE: Layers from Stadia Maps do not require an API key for localhost development or most production
  // web deployments. See https://docs.stadiamaps.com/authentication/ for details.
}
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolFullScreenControlModule } from 'ngx-ol-library/control/full-screen';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-full-screen-control-simple-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolXYZSourceModule,
    NolFullScreenControlModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-9101767, 2822912]" [nolZoom]="14" />
      <nol-tile-layer>
        <nol-xyz-source
          [nolAttributions]="attributions"
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolMaxZoom]="20"
        />
      </nol-tile-layer>
      <nol-full-screen-control />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolFullScreenControlSimpleExampleComponent {

  // Get your own API key at https://www.maptiler.com/cloud/
  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

}
import { Component } from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolXYZSourceComponent } from 'ngx-ol-library/source/xyz';
import { NolViewComponent } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-xyz-source-simple-example',
  standalone: true,
  imports: [
    NolMapComponent,
    NolViewComponent,
    NolTileLayerComponent,
    NolXYZSourceComponent,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-472202, 7530279]" [nolZoom]="12"></nol-view>
      <nol-tile-layer>
        <nol-xyz-source [nolUrl]="url"></nol-xyz-source>
      </nol-tile-layer>
    </nol-map>
  `,
})
export class NolXYZSourceSimpleExampleComponent {

  readonly url = 'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
    `?apikey=0e6fc415256d4fbb9b5166a718591d71`
}
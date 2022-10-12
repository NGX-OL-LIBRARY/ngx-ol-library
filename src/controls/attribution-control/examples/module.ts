import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NolAttributionControlModule } from 'ngx-ol-library/controls/attribution-control';
import { NolTileLayerModule } from 'ngx-ol-library/layers/tile-layer';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/sources/osm-source';
import { NolViewModule } from 'ngx-ol-library/view';

import { NolAttributionsExampleComponent } from './attributions/attributions.component';

@NgModule({
  declarations: [
    NolAttributionsExampleComponent
  ],
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolAttributionControlModule
  ]
})
export class NolAttributionControlExampleModule {}
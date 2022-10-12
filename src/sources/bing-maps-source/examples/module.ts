import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layers/tile-layer';
import { NolBingMapsSourceModule } from 'ngx-ol-library/sources/bing-maps-source';
import { NolBingMapsExampleComponent } from './bing-maps/bing-maps.component';

@NgModule({
  declarations: [
    NolBingMapsExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolBingMapsSourceModule
  ]
})
export class NolBingMapsExampleModule {}
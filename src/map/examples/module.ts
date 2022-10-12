import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolTileLayerModule } from 'ngx-ol-library/layers/tile-layer';
import { NolOSMSourceModule } from 'ngx-ol-library/sources/osm-source';

import { NolAccessibleMapExampleComponent } from './accessible-map/accessible-map.component';
import { NolMapExportExample } from './map-export/map-export.component';
import { NolSimpleMapExampleComponent } from './simple-map/simple-map.component';

@NgModule({
  declarations: [
    NolAccessibleMapExampleComponent,
    NolMapExportExample,
    NolSimpleMapExampleComponent
  ],
  imports: [
    CommonModule,
    NolMapModule, 
    NolViewModule, 
    NolTileLayerModule, 
    NolOSMSourceModule
  ],
})
export class NolMapExampleModule {}
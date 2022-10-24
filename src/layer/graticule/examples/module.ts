import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolGraticuleLayerModule } from 'ngx-ol-library/layer/graticule';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolMapGraticuleExampleComponent } from './map-graticule/map-graticule.component';

@NgModule({
  declarations: [
    NolMapGraticuleExampleComponent
  ],
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolGraticuleLayerModule,
    NolOSMSourceModule
  ]
})
export class NolGraticuleLayerExampleModule {}
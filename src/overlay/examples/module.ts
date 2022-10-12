import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NolCoordinateModule } from 'ngx-ol-library/coordinate';
import { NolTileLayerModule } from 'ngx-ol-library/layers/tile-layer';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOverlayModule } from 'ngx-ol-library/overlay';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolOSMSourceModule } from 'ngx-ol-library/sources/osm-source';
import { NolXYZSourceModule } from 'ngx-ol-library/sources/xyz-source';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolOverlayExampleComponent } from './overlay/overlay.component';
import { NolPopupExampleComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    NolOverlayExampleComponent,
    NolPopupExampleComponent
  ],
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolXYZSourceModule,
    NolOverlayModule,
    NolCoordinateModule,
    NolProjModule
  ]
})
export class NolOverlayExampleModule {}
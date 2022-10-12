import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NolMapModule } from "ngx-ol-library/map";
import { NolViewModule } from "ngx-ol-library/view";
import { NolGraticuleLayerModule } from "ngx-ol-library/layers/graticule-layer";
import { NolTileLayerModule } from "ngx-ol-library/layers/tile-layer";
import { NolOSMSourceModule } from "ngx-ol-library/sources/osm-source";
import { NolMapGraticuleExampleComponent } from "./map-graticule/map-graticule.component";

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
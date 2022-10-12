import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NolMapModule } from "ngx-ol-library/map";
import { NolViewModule } from "ngx-ol-library/view";
import { NolTileLayerModule } from "ngx-ol-library/layers/tile-layer";
import { NolOSMSourceModule } from "ngx-ol-library/sources/osm-source";
import { NolMinZoomExampleComponent } from "./min-zoom/min-zoom.component";

@NgModule({
  declarations: [
    NolMinZoomExampleComponent,
  ],
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
  ]
})
export class NolViewExamplesModule {}
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import { NolVectorTileLayerComponent } from 'ngx-ol-library/layers/vector-tile-layer';
import MapboxVectorLayer, { Options } from 'ol/layer/MapboxVector';

@Component({
  selector: 'nol-mapbox-vector-layer',
  exportAs: 'nolMapboxVectorLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMapboxVectorLayerComponent extends NolVectorTileLayerComponent<MapboxVectorLayer, string> implements OnInit, Options {

  @Input() styleUrl!: string;
  @Input() accessToken?: string | undefined;
  @Input() layers?: string[] | undefined;

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    this.instance = new MapboxVectorLayer(this);
    super.ngOnInit();
  }

}

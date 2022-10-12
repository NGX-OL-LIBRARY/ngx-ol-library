import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseTileLayerComponent } from 'ngx-ol-library/layers/base-tile-layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';

@Component({
  selector: 'nol-tile-layer',
  exportAs: 'nolTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileLayerComponent extends NolBaseTileLayerComponent<TileLayer<TileSource>> implements OnInit {

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    this.instance = new TileLayer(this);
    super.ngOnInit();
  }

}

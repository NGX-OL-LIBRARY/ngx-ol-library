import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolVectorTileLayerComponent } from 'ngx-ol-library/layers/vector-tile-layer';
import { NolWebGLTileLayerComponent } from 'ngx-ol-library/layers/webgl-tile-layer';
import { NolSourceComponent } from 'ngx-ol-library/sources/source';
import { NearestDirectionFunction } from 'ol/array';
import TileSource, { Options } from 'ol/source/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';

@Component({
  selector: 'nol-tile-source',
  exportAs: 'nolTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileSourceComponent<InstanceType extends TileSource = TileSource> extends NolSourceComponent<InstanceType> implements OnInit, Options {
  
  @Input() cacheSize?: number;
  @Input() opaque?: boolean;
  @Input() tilePixelRatio?: number;
  @Input() tileGrid?: TileGrid;
  @Input() transition?: number;
  @Input() key?: string;
  @Input() zDirection?: number | NearestDirectionFunction;

  constructor(
    @Optional() @Host() tileLayerHost?: NolTileLayerComponent, 
    @Optional() @Host() vectorTileLayerHost?: NolVectorTileLayerComponent,
    @Optional() @Host() webGLTileLayerHost?: NolWebGLTileLayerComponent
  ) { 
    super((tileLayerHost || vectorTileLayerHost || webGLTileLayerHost)!);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new TileSource(this) as InstanceType;
    }
    super.ngOnInit();
  }

}

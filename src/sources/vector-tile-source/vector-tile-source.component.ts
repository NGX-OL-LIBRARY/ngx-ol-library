import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolVectorTileLayerComponent } from 'ngx-ol-library/layers/vector-tile-layer';
import { NolUrlTileSourceComponent } from 'ngx-ol-library/sources/url-tile-source';
import { VectorTile as Tile } from 'ol';
import { Extent } from 'ol/extent';
import FeatureFormat from 'ol/format/Feature';
import { Size } from 'ol/size';
import VectorTile, { Options } from 'ol/source/VectorTile';

@Component({
  selector: 'nol-vector-tile-source',
  exportAs: 'nolVectorTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorTileSourceComponent extends NolUrlTileSourceComponent<VectorTile> implements OnInit, Options {

  @Input() extent?: Extent;
  @Input() format?: FeatureFormat;
  @Input() overlaps?: boolean;
  @Input() tileClass?: typeof Tile;
  @Input() maxZoom?: number;
  @Input() minZoom?: number;
  @Input() tileSize?: number | Size;
  @Input() maxResolution?: number;

  constructor(@Host() vectorTileLayerHost: NolVectorTileLayerComponent) { 
    super(undefined, vectorTileLayerHost);
  }

  override ngOnInit(): void {
    this.instance = new VectorTile(this);
    super.ngOnInit();
  }

}

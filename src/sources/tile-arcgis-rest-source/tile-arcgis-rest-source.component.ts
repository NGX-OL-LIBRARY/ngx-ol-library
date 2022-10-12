import {
  ChangeDetectionStrategy,
  Component,
  Host,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolTileImageSourceComponent } from 'ngx-ol-library/sources/tile-image-source';
import TileArcGISRest, { Options } from 'ol/source/TileArcGISRest';

@Component({
  selector: 'nol-tile-arcgis-rest-source',
  exportAs: 'nolTileArcgisRestSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileArcGISRestSourceComponent extends NolTileImageSourceComponent<TileArcGISRest> implements OnInit, OnChanges, Options {


  params?: Record<string, any>;
  hidpi?: boolean;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new TileArcGISRest(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { params, ...restChanges } = changes;
    if (this.instance && params) {
      this.instance.updateParams(params.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

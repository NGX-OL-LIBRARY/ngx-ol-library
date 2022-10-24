import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolTileImageSourceComponent } from 'ngx-ol-library/source/tile-image';
import TileWMS, { Options } from 'ol/source/TileWMS';
import { ServerType } from 'ol/source/wms';

@Component({
  selector: 'nol-tile-wms-source',
  exportAs: 'nolTileWMSSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileWMSSourceComponent extends NolTileImageSourceComponent<TileWMS> implements OnInit, OnChanges, Options {

  @Input() params!: Record<string, any>;
  @Input() gutter?: number;
  @Input() hidpi?: boolean;
  @Input() serverType?: ServerType;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new TileWMS(this);
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

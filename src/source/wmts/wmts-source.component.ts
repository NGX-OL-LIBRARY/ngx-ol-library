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
import WMTS, { Options, RequestEncoding } from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';

@Component({
  selector: 'nol-wmts-source',
  exportAs: 'nolWMTSSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolWMTSSourceComponent extends NolTileImageSourceComponent<WMTS> implements OnInit, OnChanges, Options {

  @Input() override tileGrid!: WMTSTileGrid;
  @Input() requestEncoding?: RequestEncoding;
  @Input() layer!: string;
  @Input() style!: string;
  @Input() format?: string;
  @Input() version?: string;
  @Input() matrixSet!: string;
  @Input() dimensions?: Record<string, any>;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new WMTS(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { dimensions, ...restChanges } = changes;
    if (this.instance && dimensions) {
      this.instance.updateDimensions(dimensions.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

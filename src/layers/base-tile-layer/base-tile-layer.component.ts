import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolLayerComponent } from 'ngx-ol-library/layers/layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import { Map } from 'ol';
import BaseTileLayer, { Options } from 'ol/layer/BaseTile';
import { ObjectEvent } from 'ol/Object';
import LayerRenderer from 'ol/renderer/Layer';
import TileSource from 'ol/source/Tile';

@Component({
  selector: 'nol-base-tile-layer',
  exportAs: 'nolBaseTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBaseTileLayerComponent<
  InstanceType extends BaseTileLayer<TileSource, LayerRenderer<any>> = BaseTileLayer<TileSource, LayerRenderer<any>>
> extends NolLayerComponent<InstanceType> implements OnInit, OnChanges, Options<TileSource> {

  @Input() source?: TileSource;
  @Input() preload?: number;
  @Input() useInterimTilesOnError?: boolean;
  @Input() map?: Map;

  @Output() onPreloadChange = new EventEmitter<ObjectEvent>();
  @Output() onUseInterimTilesOnErrorChange = new EventEmitter<ObjectEvent>();

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new BaseTileLayer(this) as InstanceType;
    }
    this.instance.on('change:preload', (event: ObjectEvent) => this.onPreloadChange.emit(event));
    this.instance.on('change:useInterimTilesOnError', (event: ObjectEvent) => this.onUseInterimTilesOnErrorChange.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { preload, useInterimTilesOnError, ...restChanges } = changes;
    if (this.instance && preload) {
      this.instance.setPreload(preload.currentValue);
    }
    if (this.instance && useInterimTilesOnError) {
      this.instance.setUseInterimTilesOnError(useInterimTilesOnError.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

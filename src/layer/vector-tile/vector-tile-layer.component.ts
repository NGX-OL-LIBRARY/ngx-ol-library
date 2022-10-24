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
import { NolBaseVectorLayerComponent } from 'ngx-ol-library/layer/base-vector';
import { NolLayerGroupComponent } from 'ngx-ol-library/layer/layer-group';
import { Map } from 'ol';
import { BackgroundColor } from 'ol/layer/Base';
import VectorTileLayer, { Options, VectorTileRenderType } from 'ol/layer/VectorTile';
import { ObjectEvent } from 'ol/Object';
import { OrderFunction } from 'ol/render';
import VectorTile from 'ol/source/VectorTile';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-vector-tile-layer',
  exportAs: 'nolVectorTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorTileLayerComponent<
  InstanceType extends VectorTileLayer = VectorTileLayer,
  SourceType extends VectorTile | string = VectorTile
> extends NolBaseVectorLayerComponent<InstanceType> implements OnInit, OnChanges, Omit<Options, 'source'> {

  @Input() renderOrder?: OrderFunction;
  @Input() renderBuffer?: number;
  @Input() renderMode?: VectorTileRenderType;
  @Input() source?: SourceType;
  @Input() map?: Map;
  @Input() declutter?: boolean;
  @Input() style?: StyleLike | null;
  @Input() background?: false | BackgroundColor;
  @Input() updateWhileAnimating?: boolean;
  @Input() updateWhileInteracting?: boolean;
  @Input() preload?: number;
  @Input() useInterimTilesOnError?: boolean;

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
      this.instance = new VectorTileLayer(this as Options) as InstanceType;
    }
    this.instance.on('change:preload', (event: ObjectEvent) => this.onPreloadChange.emit(event));
    this.instance.on('change:useInterimTilesOnError', (event: ObjectEvent) => this.onUseInterimTilesOnErrorChange.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { background, preload, useInterimTilesOnError, ...restChange } = changes;
    if (this.instance && background) {
      this.instance.setBackground(background.currentValue);
    }
    if (this.instance && preload) {
      this.instance.setPreload(preload.currentValue);
    }
    if (this.instance && useInterimTilesOnError) {
      this.instance.setUseInterimTilesOnError(useInterimTilesOnError.currentValue);
    }
    super.ngOnChanges(restChange);
  }

}

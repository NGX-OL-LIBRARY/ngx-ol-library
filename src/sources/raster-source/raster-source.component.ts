import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolImageLayerComponent } from 'ngx-ol-library/layers/image-layer';
import { NolImageSourceComponent } from 'ngx-ol-library/sources/image-source';
import Layer from 'ol/layer/Layer';
import RasterSource, { Operation, Options, RasterOperationType, RasterSourceEvent } from 'ol/source/Raster';
import Source from 'ol/source/Source';

@Component({
  selector: 'nol-raster-source',
  exportAs: 'nolRasterSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRasterSourceComponent extends NolImageSourceComponent<RasterSource> implements OnInit, OnChanges, Options {

  @Input() sources!: Array<Source | Layer>;
  @Input() operation?: Operation;
  @Input() lib?: any;
  @Input() threads?: number;
  @Input() operationType?: RasterOperationType;

  @Output() onAfteroperations = new EventEmitter<RasterSourceEvent>();
  @Output() onBeforeoperations = new EventEmitter<RasterSourceEvent>();

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new RasterSource(this);
    this.instance.on('afteroperations', (event: RasterSourceEvent) => this.onAfteroperations.emit(event));
    this.instance.on('beforeoperations', (event: RasterSourceEvent) => this.onBeforeoperations.emit(event));
    super.ngOnInit();
  }
  
  override ngOnChanges(changes: SimpleChanges): void {
    const { operation, ...restChanges } = changes;
    if (this.instance && operation) {
      this.instance.setOperation(operation.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

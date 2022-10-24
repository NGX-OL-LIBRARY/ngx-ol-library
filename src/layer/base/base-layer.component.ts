import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { Extent } from 'ol/extent';
import BaseLayer, { Options } from 'ol/layer/Base';
import { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'nol-base-layer',
  exportAs: 'nolBaseLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBaseLayerComponent<InstanceType extends BaseLayer = BaseLayer> extends NolBaseObjectComponent<InstanceType> implements OnInit, OnChanges, Options {

  @Input() opacity?: number;
  @Input() visible?: boolean;
  @Input() extent?: Extent;
  @Input() zIndex?: number;
  @Input() minResolution?: number;
  @Input() maxResolution?: number;
  @Input() minZoom?: number;
  @Input() maxZoom?: number;
  @Input() properties?: Record<string, any>;

  @Output() onExtentChange = new EventEmitter<ObjectEvent>();
  @Output() onMaxResolutionChange = new EventEmitter<ObjectEvent>();
  @Output() onMaxZoomChange = new EventEmitter<ObjectEvent>();
  @Output() onMinResolutionChange = new EventEmitter<ObjectEvent>();
  @Output() onMinZoomChange = new EventEmitter<ObjectEvent>();
  @Output() onOpacityChange = new EventEmitter<ObjectEvent>();
  @Output() onVisibleChange = new EventEmitter<ObjectEvent>();
  @Output() onZIndexChange = new EventEmitter<ObjectEvent>();

  /**
   * TODO: For two-way binding
   */

  constructor() { 
    super();
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new BaseLayer(this) as InstanceType;
    }
    this.instance.on('change:extent', (event: ObjectEvent) => this.onExtentChange.emit(event));
    this.instance.on('change:maxResolution', (event: ObjectEvent) => this.onMaxResolutionChange.emit(event));
    this.instance.on('change:maxZoom', (event: ObjectEvent) => this.onMaxZoomChange.emit(event));
    this.instance.on('change:minResolution', (event: ObjectEvent) => this.onMinResolutionChange.emit(event));
    this.instance.on('change:minZoom', (event: ObjectEvent) => this.onMinZoomChange.emit(event));
    this.instance.on('change:opacity', (event: ObjectEvent) => this.onOpacityChange.emit(event));
    this.instance.on('change:visible', (event: ObjectEvent) => this.onVisibleChange.emit(event));
    this.instance.on('change:zIndex', (event: ObjectEvent) => this.onZIndexChange.emit(event));

    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { extent, maxResolution, maxZoom, minResolution, minZoom, opacity, visible, zIndex, ...restChanges } = changes;
    if (this.instance && extent) {
      this.instance.setExtent(extent.currentValue);
    }
    if (this.instance && maxResolution) {
      this.instance.setMaxResolution(maxResolution.currentValue);
    }
    if (this.instance && maxZoom) {
      this.instance.setMaxZoom(maxZoom.currentValue);
    }
    if (this.instance && minResolution) {
      this.instance.setMinResolution(minResolution.currentValue);
    }
    if (this.instance && minZoom) {
      this.instance.setMinZoom(minZoom.currentValue);
    }
    if (this.instance && opacity) {
      this.instance.setOpacity(opacity.currentValue);
    }
    if (this.instance && visible) {
      this.instance.setVisible(visible.currentValue);
    }
    if (this.instance && zIndex) {
      this.instance.setZIndex(zIndex.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

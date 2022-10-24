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
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import Heatmap, { Options } from 'ol/layer/Heatmap';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'nol-heatmap-layer',
  exportAs: 'nolHeatmapLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolHeatmapLayerComponent extends NolBaseVectorLayerComponent<Heatmap> implements OnInit, OnChanges, Options {

  @Input() gradient?: string[];
  @Input() radius?: number;
  @Input() blur?: number;
  @Input() weight?: string | ((feature: Feature<Geometry>) => number);
  @Input() source?: VectorSource<Point>;

  @Output() onBlurChange = new EventEmitter<ObjectEvent>();
  @Output() onGradientChange = new EventEmitter<ObjectEvent>();
  @Output() onRadiusChange = new EventEmitter<ObjectEvent>();
  @Output() onPostcompose = new EventEmitter<RenderEvent>();
  @Output() onPrecompose = new EventEmitter<RenderEvent>();
  @Output() onRendercomplete = new EventEmitter<RenderEvent>();

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    this.instance = new Heatmap(this);
    this.instance.on('change:blur' as any, (event: ObjectEvent) => this.onBlurChange.emit(event));
    this.instance.on('change:gradient' as any, (event: ObjectEvent) => this.onGradientChange.emit(event));
    this.instance.on('change:radius' as any, (event: ObjectEvent) => this.onRadiusChange.emit(event));
    this.instance.on('postcompose' as any, (event: RenderEvent) => this.onPostcompose.emit(event));
    this.instance.on('precompose' as any, (event: RenderEvent) => this.onPrecompose.emit(event));
    this.instance.on('rendercomplete' as any, (event: RenderEvent) => this.onRendercomplete.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { blur, gradient, radius, ...restChanges } = changes;
    if (this.instance && blur) {
      this.instance.setBlur(blur.currentValue);
    }
    if (this.instance && gradient) {
      this.instance.setGradient(gradient.currentValue);
    }
    if (this.instance && blur) {
      this.instance.setBlur(blur.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

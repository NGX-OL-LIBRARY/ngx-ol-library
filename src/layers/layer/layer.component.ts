import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseLayerComponent } from 'ngx-ol-library/layers/base-layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import Layer, { Options } from 'ol/layer/Layer';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';

@Component({
  selector: 'nol-layer',
  exportAs: 'nolLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLayerComponent<InstanceType extends Layer = Layer> extends NolBaseLayerComponent<InstanceType> implements OnInit, OnChanges, OnDestroy, Options {

  @Input() className?: string;

  @Output() onSourceChange = new EventEmitter<ObjectEvent>();
  @Output() onPostrender = new EventEmitter<RenderEvent>();
  @Output() onPrerender = new EventEmitter<RenderEvent>();

  constructor(
    @Optional() protected mapHost?: NolMapComponent,
    @Optional() protected layerGroupHost?: NolLayerGroupComponent
  ) { 
    super();
    if (!this.mapHost && !this.layerGroupHost) {
      throw('Layer component must be nested within a map or layer group component.');
    }
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new Layer(this) as InstanceType;
    }
    this.instance.on('change:source', (event: ObjectEvent) => this.onSourceChange.emit(event));
    this.instance.on('postrender', (event: RenderEvent) => this.onPostrender.emit(event));
    this.instance.on('prerender', (event: RenderEvent) => this.onPrerender.emit(event));

    super.ngOnInit();

    if (this.layerGroupHost) {
      this.layerGroupHost.instance.getLayers().push(this.instance);
    } else {
      this.mapHost?.instance.addLayer(this.instance);
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { map, source, ...restChanges } = changes;
    if (this.instance && map) {
      this.instance.setMap(map.currentValue);
    }
    if (this.instance && source) {
      this.instance.setSource(source.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngOnDestroy(): void {
    if (this.layerGroupHost) {
      this.layerGroupHost.instance.getLayers().remove(this.instance);
    } else {
      this.mapHost?.instance.removeLayer(this.instance);
    }
  }

}

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
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseLayerComponent } from 'ngx-ol-library/layers/base-layer';
import { Collection } from 'ol';
import BaseLayer from 'ol/layer/Base';
import LayerGroup, { Options } from 'ol/layer/Group';
import { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'nol-layer-group',
  exportAs: 'nolLayerGroup',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLayerGroupComponent extends NolBaseLayerComponent<LayerGroup> implements OnInit, OnChanges, OnDestroy, Options {
  
  @Input() layers?: BaseLayer[] | Collection<BaseLayer>;

  @Output() onLayersChange = new EventEmitter<ObjectEvent>();

  constructor(
    @Optional() protected mapHost?: NolMapComponent,
    @Optional() @SkipSelf() protected layerGroupHost?: NolLayerGroupComponent
  ) { 
    super();
    
    if (!this.mapHost && !this.layerGroupHost) {
      throw('Layer group component must be nested within a map or layer group component.');
    }
  }

  override ngOnInit(): void {
    this.instance = new LayerGroup(this);
    this.instance.on('change:layers', (event: ObjectEvent) => this.onLayersChange.emit(event));

    super.ngOnInit();

    if (this.layerGroupHost) {
      this.layerGroupHost.instance.getLayers().push(this.instance);
    } else {
      this.mapHost?.instance.addLayer(this.instance);
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { layers, ...restChanges } = changes;
    if (this.instance && layers) {
      this.instance.setLayers(layers.currentValue);
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

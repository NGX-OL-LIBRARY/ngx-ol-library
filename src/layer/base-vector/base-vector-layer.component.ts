import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolLayerComponent } from 'ngx-ol-library/layer/layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layer/layer-group';
import { Geometry } from 'ol/geom';
import BaseVectorLayer, { Options } from 'ol/layer/BaseVector';
import CanvasVectorImageLayerRenderer from 'ol/renderer/canvas/VectorImageLayer';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import WebGLPointsLayerRenderer from 'ol/renderer/webgl/PointsLayer';
import VectorSource from 'ol/source/Vector';
import VectorTile from 'ol/source/VectorTile';

@Component({
  selector: 'nol-base-vector-layer',
  exportAs: 'nolBaseVectorLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBaseVectorLayerComponent<InstanceType extends BaseVectorLayer<
  VectorSource<Geometry> | VectorTile, 
  CanvasVectorLayerRenderer | CanvasVectorTileLayerRenderer | CanvasVectorImageLayerRenderer | WebGLPointsLayerRenderer
>> extends NolLayerComponent<InstanceType> implements OnInit, OnInit, OnChanges, Options<VectorSource<Geometry> | VectorTile> {

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new BaseVectorLayer(this) as InstanceType;
    }
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { style, ...restChanges } = changes;
    if (this.instance && style) {
      this.instance.setStyle(style.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

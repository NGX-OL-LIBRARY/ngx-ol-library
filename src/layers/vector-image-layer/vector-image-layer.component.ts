import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseVectorLayerComponent } from 'ngx-ol-library/layers/base-vector-layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import { Map } from 'ol';
import { Geometry } from 'ol/geom';
import VectorImageLayer, { Options } from 'ol/layer/VectorImage';
import { OrderFunction } from 'ol/render';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-vector-image-layer',
  exportAs: 'nolVectorImageLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorImageLayerComponent extends NolBaseVectorLayerComponent<VectorImageLayer<VectorSource<Geometry>>> implements OnInit, Options<VectorSource<Geometry>> {

  @Input() renderOrder?: OrderFunction;
  @Input() renderBuffer?: number;
  @Input() source?: VectorSource<Geometry>;
  @Input() map?: Map;
  @Input() declutter?: boolean;
  @Input() style?: StyleLike | null;
  @Input() imageRatio?: number;

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    this.instance = new VectorImageLayer(this);
    super.ngOnInit();
  }

}

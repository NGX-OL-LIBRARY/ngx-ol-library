import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseVectorLayerComponent } from 'ngx-ol-library/layer/base-vector';
import { NolLayerGroupComponent } from 'ngx-ol-library/layer/layer-group';
import { Map } from 'ol';
import { Geometry } from 'ol/geom';
import { BackgroundColor } from 'ol/layer/Base';
import { Options } from 'ol/layer/BaseVector';
import VectorLayer from 'ol/layer/Vector';
import { OrderFunction } from 'ol/render';
import VectorSource from 'ol/source/Vector';
import VectorTile from 'ol/source/VectorTile';
import { FlatStyleLike } from 'ol/style/flat';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-vector-layer',
  exportAs: 'nolVectorLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorLayerComponent<
  InstanceType extends VectorLayer<VectorSource<Geometry>> = VectorLayer<VectorSource<Geometry>>
> extends NolBaseVectorLayerComponent<InstanceType> implements OnInit, Options<VectorSource<Geometry> | VectorTile> {

  @Input() renderOrder?: OrderFunction;
  @Input() renderBuffer?: number;
  @Input() source?: VectorSource<Geometry>;
  @Input() map?: Map;
  @Input() declutter?: boolean;
  @Input() style?: StyleLike | FlatStyleLike | null;
  @Input() background?: BackgroundColor;
  @Input() updateWhileAnimating?: boolean;
  @Input() updateWhileInteracting?: boolean;

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new VectorLayer(this) as InstanceType;
    }
    super.ngOnInit();
  }

}

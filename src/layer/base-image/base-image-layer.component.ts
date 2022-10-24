import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolLayerComponent } from 'ngx-ol-library/layer/layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layer/layer-group';
import { Map } from 'ol';
import BaseImageLayer, { Options } from 'ol/layer/BaseImage';
import LayerRenderer from 'ol/renderer/Layer';
import ImageSource from 'ol/source/Image';

@Component({
  selector: 'nol-base-image-layer',
  exportAs: 'nolBaseImageLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBaseImageLayerComponent<
  InstanceType extends BaseImageLayer<ImageSource, LayerRenderer<any>> = BaseImageLayer<ImageSource, LayerRenderer<any>>
> extends NolLayerComponent<InstanceType> implements OnInit, Options<ImageSource> {

  @Input() map?: Map;
  @Input() source?: ImageSource;

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new BaseImageLayer(this) as InstanceType;
    }
    super.ngOnInit();
  }

}

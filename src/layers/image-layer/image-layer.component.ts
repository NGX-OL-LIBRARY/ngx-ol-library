import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseImageLayerComponent } from 'ngx-ol-library/layers/base-image-layer';
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import ImageLayer from 'ol/layer/Image';
import ImageSource from 'ol/source/Image';

@Component({
  selector: 'nol-image-layer',
  exportAs: 'nolImageLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageLayerComponent extends NolBaseImageLayerComponent<ImageLayer<ImageSource>> {

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

}

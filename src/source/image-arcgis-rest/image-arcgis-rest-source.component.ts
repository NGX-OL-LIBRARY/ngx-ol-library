import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolImageLayerComponent } from 'ngx-ol-library/layer/image';
import { NolImageSourceComponent } from 'ngx-ol-library/source/image';
import { LoadFunction } from 'ol/Image';
import ImageArcGISRest, { Options } from 'ol/source/ImageArcGISRest';

@Component({
  selector: 'nol-image-arcgis-rest-source',
  exportAs: 'nolImageArcGISRestSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageArcGISRestSourceComponent extends NolImageSourceComponent<ImageArcGISRest> implements OnInit, OnChanges, Options {

  @Input() crossOrigin?: string | null;
  @Input() hidpi?: boolean;
  @Input() imageLoadFunction?: LoadFunction;
  @Input() params?: Record<string, any>;
  @Input() ratio?: number;
  @Input() url?: string;

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new ImageArcGISRest(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { imageLoadFunction, url, params, ...restChanges } = changes;
    if (this.instance && imageLoadFunction) {
      this.instance.setImageLoadFunction(imageLoadFunction.currentValue);
    }
    if (this.instance && url) {
      this.instance.setUrl(url.currentValue);
    }
    if (this.instance && params) {
      this.instance.updateParams(params.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

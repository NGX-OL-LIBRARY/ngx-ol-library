import {
  ChangeDetectionStrategy,
  Component,
  Host,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolImageLayerComponent } from 'ngx-ol-library/layer/image';
import { NolImageSourceComponent } from 'ngx-ol-library/source/image';
import { LoadFunction } from 'ol/Image';
import ImageWMS, { Options } from 'ol/source/ImageWMS';
import { ServerType } from 'ol/source/wms.js';

@Component({
  selector: 'nol-image-wms-source',
  exportAs: 'nolImageWMSSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageWMSSourceComponent extends NolImageSourceComponent<ImageWMS> implements OnInit, OnChanges, Options {

  crossOrigin?: string | null;
  hidpi?: boolean;
  serverType?: ServerType;
  imageLoadFunction?: LoadFunction;
  params?: Record<string, any>;
  ratio?: number;
  url?: string;

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new ImageWMS(this);
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

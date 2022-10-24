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
import ImageMapGuide, { Options } from 'ol/source/ImageMapGuide';

@Component({
  selector: 'nol-image-map-guide-source',
  exportAs: 'nolImageMapGuideSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageMapGuideSourceComponent extends NolImageSourceComponent<ImageMapGuide> implements OnInit, OnChanges, Options {

  @Input() url?: string;
  @Input() crossOrigin?: string | null;
  @Input() displayDpi?: number;
  @Input() metersPerUnit?: number;
  @Input() hidpi?: boolean;
  @Input() useOverlay?: boolean;
  @Input() ratio?: number;
  @Input() imageLoadFunction?: LoadFunction;
  @Input() params?: Record<string, any>;

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new ImageMapGuide(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { imageLoadFunction, params, ...restChanges } = changes;
    if (this.instance && imageLoadFunction) {
      this.instance.setImageLoadFunction(imageLoadFunction.currentValue);
    }
    if (this.instance && params) {
      this.instance.updateParams(params.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolImageLayerComponent } from 'ngx-ol-library/layers/image-layer';
import { NolImageSourceComponent } from 'ngx-ol-library/sources/image-source';
import { Extent } from 'ol/extent';
import { LoadFunction } from 'ol/Image.js';
import { Size } from 'ol/size';
import Static, { Options } from 'ol/source/ImageStatic';

@Component({
  selector: 'nol-image-static-source',
  exportAs: 'nolImageStaticSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageStaticSourceComponent extends NolImageSourceComponent<Static> implements OnInit, Options {

  @Input() crossOrigin?: string | null;
  @Input() imageExtent?: Extent;
  @Input() imageLoadFunction?: LoadFunction;
  @Input() imageSize?: Size;
  @Input() url!: string;

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new Static(this);
  }

}

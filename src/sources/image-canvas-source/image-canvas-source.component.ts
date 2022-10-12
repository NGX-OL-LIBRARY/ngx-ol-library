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
import ImageCanvasSource, { FunctionType, Options } from 'ol/source/ImageCanvas';

@Component({
  selector: 'nol-image-canvas-source',
  exportAs: 'nolImageCanvasSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageCanvasSourceComponent extends NolImageSourceComponent<ImageCanvasSource> implements OnInit, Options {

  @Input() canvasFunction?: FunctionType;
  @Input() ratio?: number;

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new ImageCanvasSource(this);
    super.ngOnInit();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolImageLayerComponent } from 'ngx-ol-library/layers/image-layer';
import { NolSourceComponent } from 'ngx-ol-library/sources/source';
import ImageSource, { ImageSourceEvent, Options } from 'ol/source/Image';

@Component({
  selector: 'nol-image-source',
  exportAs: 'nolImageSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageSourceComponent<InstanceType extends ImageSource = ImageSource> extends NolSourceComponent<InstanceType> implements OnInit, Options {

  @Input()  resolutions?: number[];

  @Output() onImageloadend = new EventEmitter<ImageSourceEvent>();
  @Output() onImageloaderror = new EventEmitter<ImageSourceEvent>();
  @Output() onImageloadstart = new EventEmitter<ImageSourceEvent>();

  constructor(@Host() host: NolImageLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new ImageSource(this) as InstanceType;
    }
    this.instance.on('imageloadend', (event: ImageSourceEvent) => this.onImageloadend.emit(event));
    this.instance.on('imageloaderror', (event: ImageSourceEvent) => this.onImageloaderror.emit(event));
    this.instance.on('imageloadstart', (event: ImageSourceEvent) => this.onImageloadstart.emit(event));
    
    super.ngOnInit();
  }

}

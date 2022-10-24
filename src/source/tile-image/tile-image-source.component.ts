import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolUrlTileSourceComponent } from 'ngx-ol-library/source/url-tile';
import { ImageTile } from 'ol';
import TileImage, { Options } from 'ol/source/TileImage';

@Component({
  selector: 'nol-tile-image-source',
  exportAs: 'nolTileImageSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileImageSourceComponent<InstanceType extends TileImage = TileImage> extends NolUrlTileSourceComponent<InstanceType> implements OnInit, Options {


  @Input() crossOrigin?: string | null;
  @Input() reprojectionErrorThreshold?: number;
  @Input() tileClass?: typeof ImageTile;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new TileImage(this) as InstanceType;
    }
    super.ngOnInit();
  }

}

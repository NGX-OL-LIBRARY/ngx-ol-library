import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolTileImageSourceComponent } from 'ngx-ol-library/sources/tile-image-source';
import { Extent } from 'ol/extent';
import { Size } from 'ol/size';
import Zoomify, { Options, TierSizeCalculation } from 'ol/source/Zoomify';

@Component({
  selector: 'nol-zoomify-source',
  exportAs: 'nolZoomifySource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomifySourceComponent extends NolTileImageSourceComponent<Zoomify> implements OnInit, Options {

  @Input() override url!: string;
  @Input() tierSizeCalculation?: TierSizeCalculation;
  @Input() size!: Size;
  @Input() extent?: Extent;
  @Input() tileSize?: number;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new Zoomify(this);
    super.ngOnInit();
  }

}

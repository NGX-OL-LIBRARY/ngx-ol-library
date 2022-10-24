import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolTileImageSourceComponent } from 'ngx-ol-library/source/tile-image';
import { Extent } from 'ol/extent';
import { Size } from 'ol/size';
import IIIF, { Options } from 'ol/source/IIIF';

@Component({
  selector: 'nol-iiif-source',
  exportAs: 'nolIIIFSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolIIIFSourceComponent extends NolTileImageSourceComponent<IIIF> implements OnInit, Options {

  @Input() extent?: Extent | undefined;
  @Input() format?: string | undefined;
  @Input() quality?: string | undefined;
  @Input() resolutions?: number[] | undefined;
  @Input() size!: Size;
  @Input() sizes?: Size[] | undefined;
  @Input() supports?: string[] | undefined;
  @Input() tileSize?: number | Size | undefined;
  @Input() version?: string | undefined;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new IIIF(this);
    super.ngOnInit();
  }

}

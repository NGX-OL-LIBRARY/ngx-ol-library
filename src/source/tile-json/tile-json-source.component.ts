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
import { Size } from 'ol/size';
import TileJSON, { Options, Config } from 'ol/source/TileJSON';

@Component({
  selector: 'nol-tile-json-source',
  exportAs: 'nolTileJSONSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileJSONSourceComponent extends NolTileImageSourceComponent<TileJSON> implements OnInit, Options {

  @Input() jsonp?: boolean;
  @Input() tileJSON?: Config;
  @Input() tileSize?: number | Size;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new TileJSON(this);
    super.ngOnInit();
  }

}

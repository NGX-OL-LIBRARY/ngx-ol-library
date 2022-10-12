import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolTileSourceComponent } from 'ngx-ol-library/sources/tile-source';
import { Config } from 'ol/source/TileJSON';
import UTFGrid, { Options } from 'ol/source/UTFGrid';

@Component({
  selector: 'nol-utf-grid-source',
  exportAs: 'nolUTFGridSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolUTFGridSourceComponent extends NolTileSourceComponent<UTFGrid> implements OnInit, Options {

  @Input() preemptive?: boolean;
  @Input() jsonp?: boolean;
  @Input() tileJSON?: Config;
  @Input() url?: string;

  constructor(@Host() tileLayerHost: NolTileLayerComponent) { 
    super(tileLayerHost);
  }

  override ngOnInit(): void {
    this.instance = new UTFGrid(this);
    super.ngOnInit();
  }

}

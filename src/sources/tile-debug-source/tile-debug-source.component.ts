import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolXYZSourceComponent } from 'ngx-ol-library/sources/xyz-source';
import TileDebug, { Options } from 'ol/source/TileDebug';

@Component({
  selector: 'nol-tile-debug-source',
  exportAs: 'nolTileDebugSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileDebugSourceComponent extends NolXYZSourceComponent<TileDebug> implements OnInit, Options {

  @Input() template?: string;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new TileDebug(this);
    super.ngOnInit();
  }

}

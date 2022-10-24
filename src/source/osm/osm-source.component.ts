import {
  ChangeDetectionStrategy,
  Component,
  Host,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolXYZSourceComponent } from 'ngx-ol-library/source/xyz';
import OSM, { Options } from 'ol/source/OSM';

@Component({
  selector: 'nol-osm-source',
  exportAs: 'nolOSMSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOSMSourceComponent extends NolXYZSourceComponent<OSM> implements OnInit, Options {

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new OSM(this);
    super.ngOnInit();
  }

}

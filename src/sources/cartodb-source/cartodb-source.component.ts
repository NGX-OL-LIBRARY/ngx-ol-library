import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layers/tile-layer';
import { NolXYZSourceComponent } from 'ngx-ol-library/sources/xyz-source';
import CartoDB, { Options } from 'ol/source/CartoDB';

@Component({
  selector: 'nol-cartodb-source',
  exportAs: 'nolCartoDBSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCartoDBSourceComponent extends NolXYZSourceComponent<CartoDB> implements OnInit, OnChanges, Options {

  @Input() config?: Record<string, any>;
  @Input() map?: string;
  @Input() account?: string;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new CartoDB(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { config, ...restChanges } = changes;
    if (this.instance && config) {
      this.instance.setConfig(config.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

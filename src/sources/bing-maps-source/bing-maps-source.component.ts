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
import BingMaps, { Options } from 'ol/source/BingMaps';

@Component({
  selector: 'nol-bing-maps-source',
  exportAs: 'nolBingMapsSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBingMapsSourceComponent extends NolTileImageSourceComponent<BingMaps> implements OnInit, Options {

  @Input() hidpi?: boolean;
  @Input() culture?: string;
  @Input() override key!: string;
  @Input() imagerySet!: string;
  @Input() maxZoom?: number;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new BingMaps(this);
    super.ngOnInit();
  }

}

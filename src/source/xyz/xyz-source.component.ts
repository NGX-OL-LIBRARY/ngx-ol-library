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
import XYZ, { Options } from 'ol/source/XYZ';

@Component({
  selector: 'nol-xyz-source',
  exportAs: 'nolXYZSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolXYZSourceComponent<InstanceType extends XYZ = XYZ> extends NolTileImageSourceComponent<InstanceType> implements OnInit, Options {

  @Input() maxZoom?: number;
  @Input() minZoom?: number;
  @Input() maxResolution?: number;
  @Input() tileSize?: number | Size;
  @Input() gutter?: number;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new XYZ(this) as InstanceType;
    }
    super.ngOnInit();
  }

}

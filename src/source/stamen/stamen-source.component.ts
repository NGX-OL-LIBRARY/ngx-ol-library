import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolXYZSourceComponent } from 'ngx-ol-library/source/xyz';
import Stamen, { Options } from 'ol/source/Stamen';

@Component({
  selector: 'nol-stamen-source',
  exportAs: 'nolStamenSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStamenSourceComponent extends NolXYZSourceComponent<Stamen> implements OnInit, Options {

  @Input() layer!: string;

  constructor(@Host() host: NolTileLayerComponent) { 
    super(host);
  }

  override ngOnInit(): void {
    this.instance = new Stamen(this);
    super.ngOnInit();
  }

}

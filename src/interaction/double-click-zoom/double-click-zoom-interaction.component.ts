import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interaction/interaction';
import DoubleClickZoom, { Options } from 'ol/interaction/DoubleClickZoom';

@Component({
  selector: 'nol-double-click-zoom-interaction',
  exportAs: 'nolDoubleClickZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDoubleClickZoomInteractionComponent extends NolInteractionComponent<DoubleClickZoom> implements OnInit, Options {

  @Input() duration?: number;
  @Input() delta?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DoubleClickZoom(this);
    super.ngOnInit();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interactions/interaction';
import { Condition } from 'ol/events/condition';
import MouseWheelZoom, { Options } from 'ol/interaction/MouseWheelZoom';

@Component({
  selector: 'nol-mouse-wheel-zoom-interaction',
  exportAs: 'nolMouseWheelZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMouseWheelZoomInteractionComponent extends NolInteractionComponent<MouseWheelZoom> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() onFocusOnly?: boolean;
  @Input() maxDelta?: number;
  @Input() duration?: number;
  @Input() timeout?: number;
  @Input() useAnchor?: boolean;
  @Input() constrainResolution?: boolean;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new MouseWheelZoom(this);
    super.ngOnInit();
  }

}

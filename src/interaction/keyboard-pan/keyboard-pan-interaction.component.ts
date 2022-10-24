import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interaction/interaction';
import { Condition } from 'ol/events/condition';
import KeyboardPan, { Options } from 'ol/interaction/KeyboardPan';

@Component({
  selector: 'nol-keyboard-pan-interaction',
  exportAs: 'nolKeyboardPanInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolKeyboardPanInteractionComponent extends NolInteractionComponent<KeyboardPan> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() duration?: number;
  @Input() pixelDelta?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new KeyboardPan(this);
    super.ngOnInit();
  }

}

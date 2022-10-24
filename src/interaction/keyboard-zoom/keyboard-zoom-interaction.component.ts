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
import KeyboardZoom, { Options } from 'ol/interaction/KeyboardZoom';

@Component({
  selector: 'nol-keyboard-zoom-interaction',
  exportAs: 'nolKeyboardZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolKeyboardZoomInteractionComponent extends NolInteractionComponent<KeyboardZoom> implements OnInit, Options {

  @Input() duration?: number;
  @Input() condition?: Condition;
  @Input() delta?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new KeyboardZoom(this);
    super.ngOnInit();
  }

}

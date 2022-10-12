import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interactions/pointer-interaction';
import PinchRotate, { Options } from 'ol/interaction/PinchRotate';

@Component({
  selector: 'nol-pinch-rotate-interaction',
  exportAs: 'nolPinchRotateInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPinchRotateInteractionComponent extends NolPointerInteractionComponent<PinchRotate> implements OnInit, Options {

  @Input() duration?: number;
  @Input() threshold?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new PinchRotate(this);
    super.ngOnInit();
  }

}

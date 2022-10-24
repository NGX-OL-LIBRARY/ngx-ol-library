import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import PinchZoom, { Options } from 'ol/interaction/PinchZoom';

@Component({
  selector: 'nol-pinch-zoom-interaction',
  exportAs: 'nolPinchZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPinchZoomInteractionComponent extends NolPointerInteractionComponent<PinchZoom> implements OnInit, Options {

  @Input() duration?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new PinchZoom(this);
    super.ngOnInit();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Condition } from 'ol/events/condition';
import DragRotateAndZoom, { Options } from 'ol/interaction/DragRotateAndZoom';

@Component({
  selector: 'nol-drag-rotate-and-zoom-interaction',
  exportAs: 'nolDragRotateAndZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragRotateAndZoomInteractionComponent extends NolPointerInteractionComponent<DragRotateAndZoom> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() duration?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DragRotateAndZoom(this);
    super.ngOnInit();
  }

}

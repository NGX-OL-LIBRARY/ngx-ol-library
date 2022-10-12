import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interactions/pointer-interaction';
import { Condition } from 'ol/events/condition';
import DragRotate, { Options } from 'ol/interaction/DragRotate';

@Component({
  selector: 'nol-drag-rotate-interaction',
  exportAs: 'nolDragRotateInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragRotateInteractionComponent extends NolPointerInteractionComponent<DragRotate> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() duration?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DragRotate(this);
    super.ngOnInit();
  }

}

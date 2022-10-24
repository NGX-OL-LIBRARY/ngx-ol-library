import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Kinetic } from 'ol';
import { Condition } from 'ol/events/condition';
import DragPan, { Options } from 'ol/interaction/DragPan';

@Component({
  selector: 'nol-drag-pan-interaction',
  exportAs: 'nolDragPanInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragPanInteractionComponent extends NolPointerInteractionComponent<DragPan> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() onFocusOnly?: boolean;
  @Input() kinetic?: Kinetic;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DragPan(this);
    super.ngOnInit();
  }

}

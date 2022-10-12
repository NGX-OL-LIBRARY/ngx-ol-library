import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interactions/pointer-interaction';
import { Condition } from 'ol/events/condition';
import DragBox, { DragBoxEvent, EndCondition, Options } from 'ol/interaction/DragBox';

@Component({
  selector: 'nol-drag-box-interaction',
  exportAs: 'nolDragBoxInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragBoxInteractionComponent<InstanceType extends DragBox = DragBox> extends NolPointerInteractionComponent<InstanceType> implements OnInit, Options {

  @Input() className?: string;
  @Input() condition?: Condition;
  @Input() minArea?: number;
  @Input() boxEndCondition?: EndCondition;

  @Output() onBoxcancel = new EventEmitter<DragBoxEvent>();
  @Output() onBoxdrag = new EventEmitter<DragBoxEvent>();
  @Output() onBoxend = new EventEmitter<DragBoxEvent>();
  @Output() onBoxstart = new EventEmitter<DragBoxEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new DragBox(this) as InstanceType;
    }
    this.instance.on('boxcancel', (event: DragBoxEvent) => this.onBoxcancel.emit(event));
    this.instance.on('boxdrag', (event: DragBoxEvent) => this.onBoxdrag.emit(event));
    this.instance.on('boxend', (event: DragBoxEvent) => this.onBoxend.emit(event));
    this.instance.on('boxstart', (event: DragBoxEvent) => this.onBoxstart.emit(event));
    super.ngOnInit();
  }

}

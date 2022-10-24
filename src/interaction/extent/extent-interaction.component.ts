import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Condition } from 'ol/events/condition';
import { Extent } from 'ol/extent';
import ExtentInteraction, { ExtentEvent, Options } from 'ol/interaction/Extent';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-extent-interaction',
  exportAs: 'nolExtentInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolExtentInteractionComponent extends NolPointerInteractionComponent<ExtentInteraction> implements OnInit, OnChanges, Options {

  @Input() condition?: Condition;
  @Input() extent?: Extent;
  @Input() boxStyle?: StyleLike;
  @Input() pixelTolerance?: number;
  @Input() pointerStyle?: StyleLike;
  @Input() wrapX?: boolean;

  @Output() onExtentchanged = new EventEmitter<ExtentEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new ExtentInteraction(this);
    this.instance.on('extentchanged', (event: ExtentEvent) => this.onExtentchanged.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { extent, ...restChanges } = changes;
    if (this.instance && extent) {
      this.instance.setExtent(extent.currentValue);
    }
    super.ngOnChanges(restChanges);
  }
}

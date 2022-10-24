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
import { NolControlComponent } from 'ngx-ol-library/control/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import ScaleLine, { Options, Units } from 'ol/control/ScaleLine';
import { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'nol-scale-line-control',
  exportAs: 'nolScaleLineControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolScaleLineControlComponent extends NolControlComponent<ScaleLine> implements OnInit, OnChanges, Options {

  @Input() className?: string;
  @Input() minWidth?: number;
  @Input() maxWidth?: number;
  @Input() units?: Units;
  @Input() bar?: boolean;
  @Input() steps?: number;
  @Input() text?: boolean;
  @Input() dpi?: number;

  @Output() onUnitsChange = new EventEmitter<ObjectEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new ScaleLine(this);
    this.instance.on('change:units', (event: ObjectEvent) => this.onUnitsChange.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { dpi, units, ...restChanges } = changes;
    if (this.instance && dpi) {
      this.instance.setDpi(dpi.currentValue);
    }
    if (this.instance && units) {
      this.instance.setUnits(units.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

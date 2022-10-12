import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { NolMapComponent } from 'ngx-ol-library/map';
import { MapEvent } from 'ol';
import Control, { Options } from 'ol/control/Control';

@Component({
  selector: 'nol-control',
  exportAs: 'nolControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolControlComponent<InstanceType extends Control = Control> extends NolBaseObjectComponent<InstanceType> implements OnInit, OnChanges, OnDestroy, Options {

  @Input() element?: HTMLElement;
  @Input() render?: ((event: MapEvent) => void);
  @Input() target?: string | HTMLElement;

  constructor(protected host: NolMapComponent) { 
    super();
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new Control(this) as InstanceType;
    }
    super.ngOnInit();
    this.host.instance.addControl(this.instance);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { target, ...restChanges } = changes;
    if (this.instance && target) {
      this.instance.setTarget(target.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngOnDestroy(): void {
    this.host.instance.removeControl(this.instance);
  }

}

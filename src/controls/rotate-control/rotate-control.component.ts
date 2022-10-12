import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/controls/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import Rotate, { Options } from 'ol/control/Rotate';

@Component({
  selector: 'nol-rotate-control',
  exportAs: 'nolRotateControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRotateControlComponent extends NolControlComponent<Rotate> implements OnInit, Options {

  @Input() className?: string;
  @Input() label?: string | HTMLElement;
  @Input() tipLabel?: string;
  @Input() compassClassName?: string;
  @Input() duration?: number;
  @Input() autoHide?: boolean;
  @Input() resetNorth?: (() => void);

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Rotate(this);
    super.ngOnInit();
  }

}

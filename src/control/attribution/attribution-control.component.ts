import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/control/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import Attribution, { Options } from 'ol/control/Attribution';

@Component({
  selector: 'nol-attribution-control',
  exportAs: 'nolAttributionControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolAttributionControlComponent extends NolControlComponent<Attribution> implements OnInit, OnChanges, Options {

  @Input() className?: string;
  @Input() collapsible?: boolean;
  @Input() collapsed?: boolean;
  @Input() tipLabel?: string;
  @Input() label?: string | HTMLElement;
  @Input() expandClassName?: string;
  @Input() collapseLabel?: string | HTMLElement;
  @Input() collapseClassName?: string;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Attribution(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { collapsed, collapsible, ...restChanges } = changes;
    if (this.instance && collapsed) {
      this.instance.setCollapsed(collapsed.currentValue);
    }
    if (this.instance && collapsible) {
      this.instance.setCollapsible(collapsible.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

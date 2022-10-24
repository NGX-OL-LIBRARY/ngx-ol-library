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
import { Collection, View } from 'ol';
import OverviewMap, { Options } from 'ol/control/OverviewMap';
import BaseLayer from 'ol/layer/Base';

@Component({
  selector: 'nol-overview-map-control',
  exportAs: 'nolOverviewMapControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOverviewMapControlComponent extends NolControlComponent<OverviewMap> implements OnInit, OnChanges, Options {

  @Input() className?: string;
  @Input() collapsed?: boolean;
  @Input() collapseLabel?: string | HTMLElement;
  @Input() collapsible?: boolean;
  @Input() label?: string | HTMLElement;
  @Input() layers?: BaseLayer[] | Collection<BaseLayer>;
  @Input() rotateWithView?: boolean;
  @Input() tipLabel?: string;
  @Input() view?: View;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    if (!this.view) {
      this.view = this.host.instance.getView();
    }
    this.instance = new OverviewMap(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { collapsed, collapsible, rotateWithView, ...restChanges } = changes;
    if (this.instance && collapsed) {
      this.instance.setCollapsed(collapsed.currentValue);
    }
    if (this.instance && collapsible) {
      this.instance.setCollapsible(collapsible.currentValue);
    }
    if (this.instance && rotateWithView) {
      this.instance.setRotateWithView(rotateWithView.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

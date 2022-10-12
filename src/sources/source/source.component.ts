import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { NolLayerComponent } from 'ngx-ol-library/layers/layer';
import { ProjectionLike } from 'ol/proj';
import Source, { AttributionLike, Options, State } from 'ol/source/Source';

@Component({
  selector: 'nol-source',
  exportAs: 'nolSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSourceComponent<InstanceType extends Source = Source> extends NolBaseObjectComponent<InstanceType> implements OnInit, OnChanges, OnDestroy, Options {

  @Input() attributions?: AttributionLike;
  @Input() attributionsCollapsible?: boolean;
  @Input() projection?: ProjectionLike;
  @Input() state?: State;
  @Input() wrapX?: boolean;
  @Input() interpolate?: boolean;

  constructor(@Host() protected host: NolLayerComponent) { 
    super();
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new Source(this) as InstanceType;
    }
    super.ngOnInit();
    this.host.instance.setSource(this.instance);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { attributions, ...restChanges } = changes;
    if (this.instance && attributions) {
      this.instance.setAttributions(attributions.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngOnDestroy(): void {
    this.host.instance.setSource(null);
  }

}

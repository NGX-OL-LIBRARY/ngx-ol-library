import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  InjectOptions,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { Collection, MapEvent, View } from 'ol';
import { ObjectEvent } from 'ol/Object';
import BaseEvent from 'ol/events/Event';
import BaseLayer from 'ol/layer/Base';
import OverviewMap, { Options } from 'ol/control/OverviewMap';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Create a new control with a map acting as an overview map for another defined map.
 * @name nol-overview-map-control
 * @order 1
 */
@Component({
  selector: 'nol-overview-map-control',
  exportAs: 'nolOverviewMapControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOverviewMapControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {
  
  @Input() nolClassName?: string;
  @Input() nolCollapsed?: boolean;
  @Input() nolCollapseLabel?: string | HTMLElement;
  @Input() nolCollapsible?: boolean;
  @Input() nolLabel?: string | HTMLElement;
  @Input() nolLayers?: BaseLayer[] | Collection<BaseLayer>;
  @Input() nolRender?: ((evt: MapEvent) => void);
  @Input() nolRotateWithView?: boolean;
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolTipLabel?: string;
  @Input() nolView?: View;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: OverviewMap;

  getInstance(): OverviewMap {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new OverviewMap({
      className: this.nolClassName,
      collapsed: this.nolCollapsed,
      collapseLabel: this.nolCollapseLabel,
      collapsible: this.nolCollapsible,
      label: this.nolLabel,
      layers: this.nolLayers,
      render: this.nolRender,
      rotateWithView: this.nolRotateWithView,
      target: this.nolTarget,
      tipLabel: this.nolTipLabel,
      view: this.nolView,
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });
    
    this.host.getInstance().addControl(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolCollapsed,
      nolCollapsible,
      nolProperties,
      nolRotateWithView,
      nolTarget,
    } = changes;

    if (nolCollapsed) {
      this.instance.setCollapsed(nolCollapsed.currentValue);
    }

    if (nolCollapsible) {
      this.instance.setCollapsible(nolCollapsible.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolRotateWithView) {
      this.instance.setRotateWithView(nolRotateWithView.currentValue);
    }

    if (nolTarget) {
      this.instance.setTarget(nolTarget.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeControl(this.instance);
  }

}

export function useOverviewMapControl(): NolOverviewMapControlComponent;
export function useOverviewMapControl(options: InjectOptions & {optional?: false}): NolOverviewMapControlComponent;
export function useOverviewMapControl(options: InjectOptions): NolOverviewMapControlComponent | null;
export function useOverviewMapControl(options?: InjectOptions): NolOverviewMapControlComponent | null  {
  return inject(NolOverviewMapControlComponent, options || {}) || null;
}

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
import { MapEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import Attribution, { Options } from 'ol/control/Attribution';
import BaseEvent from 'ol/events/Event';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Control component to show all the attributions associated with the layer 
 * sources in the map.
 * @name nol-attribution-control
 * @order 1
 */
@Component({
  selector: 'nol-attribution-control',
  exportAs: 'nolAttributionControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolAttributionControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolCollapsible?: boolean;
  @Input() nolCollapsed?: boolean;
  @Input() nolTipLabel?: string;
  @Input() nolLabel?: string | HTMLElement;
  @Input() nolExpandClassName?: string;
  @Input() nolCollapseLabel?: string | HTMLElement;
  @Input() nolCollapseClassName?: string;
  @Input() nolRender?: ((event: MapEvent) => void);
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Attribution;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Attribution({
      className: this.nolClassName,
      target: this.nolTarget,
      collapsible: this.nolCollapsible,
      collapsed: this.nolCollapsed,
      tipLabel: this.nolTipLabel,
      label: this.nolLabel,
      expandClassName: this.nolExpandClassName,
      collapseLabel: this.nolCollapseLabel,
      collapseClassName: this.nolCollapseClassName,
      render: this.nolRender,
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

    if (nolTarget) {
      this.instance.setTarget(nolTarget.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeControl(this.instance);
  }

}

export function useAttributionControl(): NolAttributionControlComponent;
export function useAttributionControl(options: InjectOptions & {optional?: false}): NolAttributionControlComponent;
export function useAttributionControl(options: InjectOptions): NolAttributionControlComponent | null;
export function useAttributionControl(options?: InjectOptions): NolAttributionControlComponent | null  {
  return inject(NolAttributionControlComponent, options || {}) || null;
}

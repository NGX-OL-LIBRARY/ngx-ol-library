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
import { ObjectEvent } from 'ol/Object';
import { Extent } from 'ol/extent';
import BaseEvent from 'ol/events/Event';
import ZoomToExtent, { Options } from 'ol/control/ZoomToExtent';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A button control which, when pressed, changes the map view to a specific extent.
 * @name nol-zoom-to-extent-control
 * @order 1
 */
@Component({
  selector: 'nol-zoom-to-extent-control',
  exportAs: 'nolZoomToExtentControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomToExtentControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolLabel?: string | HTMLElement;
  @Input() nolTipLabel?: string;
  @Input() nolExtent?: Extent;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: ZoomToExtent;

  getInstance(): ZoomToExtent {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ZoomToExtent({
      className: this.nolClassName,
      target: this.nolTarget,
      label: this.nolLabel,
      tipLabel: this.nolTipLabel,
      extent: this.nolExtent,
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

    const { nolProperties, nolTarget } = changes;

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

export function useZoomToExtentControl(): NolZoomToExtentControlComponent;
export function useZoomToExtentControl(options: InjectOptions & {optional?: false}): NolZoomToExtentControlComponent;
export function useZoomToExtentControl(options: InjectOptions): NolZoomToExtentControlComponent | null;
export function useZoomToExtentControl(options?: InjectOptions): NolZoomToExtentControlComponent | null  {
  return inject(NolZoomToExtentControlComponent, options || {}) || null;
}

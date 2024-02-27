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
import BaseEvent from 'ol/events/Event';
import ZoomSlider, { Options } from 'ol/control/ZoomSlider';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A slider type of control for zooming.
 * @name nol-zoom-slider-control
 * @order 1
 */
@Component({
  selector: 'nol-zoom-slider-control',
  exportAs: 'nolZoomSliderControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomSliderControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolDuration?: number;
  @Input() nolRender?: ((event: MapEvent) => void);
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: ZoomSlider;

  getInstance(): ZoomSlider {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ZoomSlider({
      className: this.nolClassName,
      duration: this.nolDuration,
      render: this.nolRender,
      target: this.nolTarget,
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

export function useZoomSliderControl(): NolZoomSliderControlComponent;
export function useZoomSliderControl(options: InjectOptions & {optional?: false}): NolZoomSliderControlComponent;
export function useZoomSliderControl(options: InjectOptions): NolZoomSliderControlComponent | null;
export function useZoomSliderControl(options?: InjectOptions): NolZoomSliderControlComponent | null  {
  return inject(NolZoomSliderControlComponent, options || {}) || null;
}

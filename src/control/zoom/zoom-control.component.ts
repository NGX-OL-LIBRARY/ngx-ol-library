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
import BaseEvent from 'ol/events/Event';
import Zoom, { Options } from 'ol/control/Zoom';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A control with 2 buttons, one for zoom in and one for zoom out.
 * @name nol-zoom-control
 * @order 1
 */
@Component({
  selector: 'nol-zoom-control',
  exportAs: 'nolZoomControl',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolDuration?: number;
  @Input() nolClassName?: string;
  @Input() nolZoomInClassName?: string;
  @Input() nolZoomOutClassName?: string;
  @Input() nolZoomInLabel?: string | HTMLElement;
  @Input() nolZoomOutLabel?: string | HTMLElement;
  @Input() nolZoomInTipLabel?: string;
  @Input() nolZoomOutTipLabel?: string;
  @Input() nolDelta?: number;
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Zoom;

  getInstance(): Zoom {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Zoom({
      duration: this.nolDuration,
      className: this.nolClassName,
      zoomInClassName: this.nolZoomInClassName,
      zoomOutClassName: this.nolZoomOutClassName,
      zoomInLabel: this.nolZoomInLabel,
      zoomOutLabel: this.nolZoomOutLabel,
      zoomInTipLabel: this.nolZoomInTipLabel,
      zoomOutTipLabel: this.nolZoomOutTipLabel,
      delta: this.nolDelta,
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

export function useZoomControl(): NolZoomControlComponent;
export function useZoomControl(options: InjectOptions & {optional?: false}): NolZoomControlComponent;
export function useZoomControl(options: InjectOptions): NolZoomControlComponent | null;
export function useZoomControl(options?: InjectOptions): NolZoomControlComponent | null  {
  return inject(NolZoomControlComponent, options || {}) || null;
}
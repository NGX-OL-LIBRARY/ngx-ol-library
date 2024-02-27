import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import ScaleLine, { Options, Units } from 'ol/control/ScaleLine';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A control component displaying rough y-axis distances, calculated for the 
 * center of the viewport.
 * @name nol-scale-line-control
 * @order 1
 */
@Component({
  selector: 'nol-scale-line-control',
  exportAs: 'nolScaleLineControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolScaleLineControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolMinWidth?: number;
  @Input() nolMaxWidth?: number;
  @Input() nolRender?: ((event: MapEvent) => void);
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolUnits?: Units;
  @Input() nolBar?: boolean;
  @Input() nolSteps?: number;
  @Input() nolText?: boolean;
  @Input() nolDpi?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolUnitsChange = new EventEmitter<Units>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: ScaleLine;

  getInstance(): ScaleLine {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ScaleLine({
      className: this.nolClassName,
      minWidth: this.nolMinWidth,
      maxWidth: this.nolMaxWidth,
      render: this.nolRender,
      target: this.nolTarget,
      units: this.nolUnits,
      bar: this.nolBar,
      steps: this.nolSteps,
      text: this.nolText,
      dpi: this.nolDpi
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:units')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolUnits = this.instance.getUnits();
        this.nolUnitsChange.emit(this.nolUnits);
        this.cdr.markForCheck();
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
      nolDpi,
      nolProperties,
      nolTarget,
      nolUnits,
    } = changes;

    if (nolDpi) {
      this.instance.setDpi(nolDpi.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolTarget) {
      this.instance.setTarget(nolTarget.currentValue);
    }

    if (nolUnits) {
      this.instance.setUnits(nolUnits.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeControl(this.instance);
  }

}

export function useScaleLineControl(): NolScaleLineControlComponent;
export function useScaleLineControl(options: InjectOptions & {optional?: false}): NolScaleLineControlComponent;
export function useScaleLineControl(options: InjectOptions): NolScaleLineControlComponent | null;
export function useScaleLineControl(options?: InjectOptions): NolScaleLineControlComponent | null  {
  return inject(NolScaleLineControlComponent, options || {}) || null;
}

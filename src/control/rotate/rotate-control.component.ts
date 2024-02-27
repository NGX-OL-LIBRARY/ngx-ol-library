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
import Rotate, { Options } from 'ol/control/Rotate';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A button control component to reset rotation to 0.
 * @name nol-rotate-control
 * @order 1
 */
@Component({
  selector: 'nol-rotate-control',
  exportAs: 'nolRotateControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRotateControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolLabel?: string | HTMLElement;
  @Input() nolTipLabel?: string;
  @Input() nolCompassClassName?: string;
  @Input() nolDuration?: number;
  @Input() nolAutoHide?: boolean;
  @Input() nolRender?: ((evt: MapEvent) => void);
  @Input() nolResetNorth?: (() => void);
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Rotate;

  getInstance(): Rotate {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Rotate({
      className: this.nolClassName,
      label: this.nolLabel,
      tipLabel: this.nolTipLabel,
      compassClassName: this.nolCompassClassName,
      duration: this.nolDuration,
      autoHide: this.nolAutoHide,
      render: this.nolRender,
      resetNorth: this.nolResetNorth,
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

export function useRotateControl(): NolRotateControlComponent;
export function useRotateControl(options: InjectOptions & {optional?: false}): NolRotateControlComponent;
export function useRotateControl(options: InjectOptions): NolRotateControlComponent | null;
export function useRotateControl(options?: InjectOptions): NolRotateControlComponent | null  {
  return inject(NolRotateControlComponent, options || {}) || null;
}

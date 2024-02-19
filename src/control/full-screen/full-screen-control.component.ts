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
import FullScreen, { Options } from 'ol/control/FullScreen';
import BaseEvent from 'ol/events/Event';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Provides a button that when clicked fills up the full screen with the map.
 * @name nol-full-screen-control
 * @order 1
 */
@Component({
  selector: 'nol-full-screen-control',
  exportAs: 'nolFullScreenControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolFullScreenControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolLabel?: string | HTMLElement | Text;
  @Input() nolLabelActive?: string | HTMLElement | Text;
  @Input() nolActiveClassName?: string;
  @Input() nolInactiveClassName?: string;
  @Input() nolTipLabel?: string;
  @Input() nolKeys?: boolean;
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolSource?: string | HTMLElement;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolEnterfullscreen = new EventEmitter<void>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolLeavefullscreen = new EventEmitter<void>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: FullScreen;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new FullScreen({
      className: this.nolClassName,
      label: this.nolLabel,
      labelActive: this.nolLabelActive,
      activeClassName: this.nolActiveClassName,
      inactiveClassName: this.nolInactiveClassName,
      tipLabel: this.nolTipLabel,
      keys: this.nolKeys,
      target: this.nolTarget,
      source: this.nolSource,
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<NolSafeAny>(this.instance, 'enterfullscreen')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolEnterfullscreen.emit();
      });

    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });

    fromEvent<NolSafeAny>(this.instance, 'leavefullscreen')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolLeavefullscreen.emit();
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

export function useFullScreenControl(): NolFullScreenControlComponent;
export function useFullScreenControl(options: InjectOptions & {optional?: false}): NolFullScreenControlComponent;
export function useFullScreenControl(options: InjectOptions): NolFullScreenControlComponent | null;
export function useFullScreenControl(options?: InjectOptions): NolFullScreenControlComponent | null  {
  return inject(NolFullScreenControlComponent, options || {}) || null;
}

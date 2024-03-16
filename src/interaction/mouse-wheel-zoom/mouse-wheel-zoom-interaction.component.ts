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
import { ObjectEvent } from 'ol/Object';
import { Condition } from 'ol/events/condition';
import BaseEvent from 'ol/events/Event';
import MouseWheelZoom, { Options } from 'ol/interaction/MouseWheelZoom';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component that allows the user to zoom the map by scrolling 
 * the mouse wheel.
 * @name nol-mouse-wheel-zoom-interaction
 * @order 1
 */
@Component({
  selector: 'nol-mouse-wheel-zoom-interaction',
  exportAs: 'MouseWheelZoomInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMouseWheelZoomInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolCondition?: Condition;
  @Input() nolOnFocusOnly?: boolean;
  @Input() nolMaxDelta?: number;
  @Input() nolDuration?: number;
  @Input() nolTimeout?: number;
  @Input() nolUseAnchor?: boolean;
  @Input() nolConstrainResolution?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: MouseWheelZoom;

  getInstance(): MouseWheelZoom {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new MouseWheelZoom({
      condition: this.nolCondition,
      onFocusOnly: this.nolOnFocusOnly,
      maxDelta: this.nolMaxDelta,
      duration: this.nolDuration,
      timeout: this.nolTimeout,
      useAnchor: this.nolUseAnchor,
      constrainResolution: this.nolConstrainResolution,
    });

    this.instance.setActive(this.nolActive);

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });
      
    fromEvent<BaseEvent>(this.instance, 'change:active')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolActive = this.instance.getActive();
        this.nolActiveChange.emit(this.nolActive);
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
      
    this.host.getInstance().addInteraction(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolActive, nolUseAnchor, nolProperties } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolUseAnchor) {
      this.instance.setMouseAnchor(nolUseAnchor.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function useMouseWheelZoomInteraction(): NolMouseWheelZoomInteractionComponent;
export function useMouseWheelZoomInteraction(options: InjectOptions & {optional?: false}): NolMouseWheelZoomInteractionComponent;
export function useMouseWheelZoomInteraction(options: InjectOptions): NolMouseWheelZoomInteractionComponent | null;
export function useMouseWheelZoomInteraction(options?: InjectOptions): NolMouseWheelZoomInteractionComponent | null  {
  return inject(NolMouseWheelZoomInteractionComponent, options || {}) || null;
}
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
import { Extent } from 'ol/extent';
import { StyleLike } from 'ol/style/Style';
import BaseEvent from 'ol/events/Event';
import ExtentInteraction, { ExtentEvent, Options } from 'ol/interaction/Extent';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component that allows the user to draw a vector box by clicking 
 * and dragging on the map.
 * @name nol-extent-interaction
 * @order 1
 */
@Component({
  selector: 'nol-extent-interaction',
  exportAs: 'nolExtentInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolExtentInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolCondition?: Condition;
  @Input() nolExtent?: Extent;
  @Input() nolBoxStyle?: StyleLike;
  @Input() nolPixelTolerance?: number;
  @Input() nolPointerStyle?: StyleLike;
  @Input() nolWrapX?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolExtentchanged = new EventEmitter<ExtentEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: ExtentInteraction;

  getInstance(): ExtentInteraction {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ExtentInteraction({
      condition: this.nolCondition,
      extent: this.nolExtent,
      boxStyle: this.nolBoxStyle,
      pixelTolerance: this.nolPixelTolerance,
      pointerStyle: this.nolPointerStyle,
      wrapX: this.nolWrapX,
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

    fromEvent<ObjectEvent>(this.instance, 'change:active')
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

    fromEvent<ExtentEvent>(this.instance, 'extentchanged')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolExtentchanged.emit(evt);
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

    const { nolActive, nolExtent, nolProperties } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolExtent) {
      this.instance.setExtent(nolExtent.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function useExtentInteraction(): NolExtentInteractionComponent;
export function useExtentInteraction(options: InjectOptions & {optional?: false}): NolExtentInteractionComponent;
export function useExtentInteraction(options: InjectOptions): NolExtentInteractionComponent | null;
export function useExtentInteraction(options?: InjectOptions): NolExtentInteractionComponent | null  {
  return inject(NolExtentInteractionComponent, options || {}) || null;
}


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
import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import BaseEvent from 'ol/events/Event';
import PointerInteraction, { Options } from 'ol/interaction/Pointer';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Base component that calls user-defined functions on `down`, `move` and `up` 
 * events.
 * @name nol-pointer-interaction
 * @order 1
 */
@Component({
  selector: 'nol-pointer-interaction',
  exportAs: 'nolPointerInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPointerInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive?: boolean;
  @Input() nolHandleDownEvent?: ((event: MapBrowserEvent<PointerEvent>) => boolean);
  @Input() nolHandleDragEvent?: ((event: MapBrowserEvent<PointerEvent>) => void);
  @Input() nolHandleEvent?: ((event: MapBrowserEvent<PointerEvent>) => boolean);
  @Input() nolHandleMoveEvent?: ((event: MapBrowserEvent<PointerEvent>) => void);
  @Input() nolHandleUpEvent?: ((event: MapBrowserEvent<PointerEvent>) => boolean);
  @Input() nolStopDown?: ((event: boolean) => boolean);
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: PointerInteraction;

  getInstance(): PointerInteraction {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new PointerInteraction({
      handleDownEvent: this.nolHandleDownEvent,
      handleDragEvent: this.nolHandleDragEvent,
      handleEvent: this.nolHandleEvent,
      handleMoveEvent: this.nolHandleMoveEvent,
      handleUpEvent: this.nolHandleUpEvent,
      stopDown: this.nolStopDown,
    });

    if (typeof this.nolActive === 'boolean') {
      this.instance.setActive(this.nolActive);
    }

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

    const { nolActive, nolProperties } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function usePointerInteraction(): NolPointerInteractionComponent;
export function usePointerInteraction(options: InjectOptions & {optional?: false}): NolPointerInteractionComponent;
export function usePointerInteraction(options: InjectOptions): NolPointerInteractionComponent | null;
export function usePointerInteraction(options?: InjectOptions): NolPointerInteractionComponent | null  {
  return inject(NolPointerInteractionComponent, options || {}) || null;
}

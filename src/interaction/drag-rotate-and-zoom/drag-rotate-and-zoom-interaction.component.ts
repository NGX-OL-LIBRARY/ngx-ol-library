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
import DragRotateAndZoom, { Options } from 'ol/interaction/DragRotateAndZoom';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Allows the user to zoom and rotate the map by clicking and dragging on the map. 
 * @name nol-drag-rotate-and-zoom-interaction
 * @order 1
 */
@Component({
  selector: 'nol-drag-rotate-and-zoom-interaction',
  exportAs: 'nolDragRotateAndZoomInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragRotateAndZoomInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive?: boolean;
  @Input() nolCondition?: Condition;
  @Input() nolDuration?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instnace!: DragRotateAndZoom;

  getInstance(): DragRotateAndZoom {
    return this.instnace;
  }

  ngOnInit(): void {
    this.instnace = new DragRotateAndZoom({
      condition: this.nolCondition,
      duration: this.nolDuration,
    });

    if (this.nolActive) {
      this.instnace.setActive(this.nolActive);
    }

    if (this.nolProperties) {
      this.instnace.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instnace, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });
      
    fromEvent<BaseEvent>(this.instnace, 'change:active')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolActive = this.instnace.getActive();
        this.nolActiveChange.emit(this.nolActive);
        this.cdr.markForCheck();
      });
      
    fromEvent<BaseEvent>(this.instnace, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });
      
    fromEvent<ObjectEvent>(this.instnace, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });
      
    this.host.getInstance().addInteraction(this.instnace);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instnace) return;

    const { nolActive, nolProperties } = changes;

    if (nolActive) {
      this.instnace.setActive(nolActive.currentValue);
    }

    if (nolProperties) {
      this.instnace.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instnace);
  }

}

export function useDragRotateAndZoomInteraction(): NolDragRotateAndZoomInteractionComponent;
export function useDragRotateAndZoomInteraction(options: InjectOptions & {optional?: false}): NolDragRotateAndZoomInteractionComponent;
export function useDragRotateAndZoomInteraction(options: InjectOptions): NolDragRotateAndZoomInteractionComponent | null;
export function useDragRotateAndZoomInteraction(options?: InjectOptions): NolDragRotateAndZoomInteractionComponent | null  {
  return inject(NolDragRotateAndZoomInteractionComponent, options || {}) || null;
}

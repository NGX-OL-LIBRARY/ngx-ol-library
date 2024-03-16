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
import { Condition } from 'ol/events/condition';
import BaseEvent from 'ol/events/Event';
import DragBox, { DragBoxEvent, EndCondition, Options } from 'ol/interaction/DragBox';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component allows the user to draw a vector box by clicking and 
 * dragging on the map.
 * @name nol-drag-box-interaction
 * @order 1
 */
@Component({
  selector: 'nol-drag-box-interaction',
  exportAs: 'nolDragBoxInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragBoxInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolClassName?: string;
  @Input() nolCondition?: Condition;
  @Input() nolMinArea?: number;
  @Input() nolBoxEndCondition?: EndCondition;
  @Input() nolOnBoxEnd?: ((event: MapBrowserEvent<PointerEvent>) => void);
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolBoxcancel = new EventEmitter<DragBoxEvent>();
  @Output() nolBoxdrag = new EventEmitter<DragBoxEvent>();
  @Output() nolBoxend = new EventEmitter<DragBoxEvent>();
  @Output() nolBoxstart = new EventEmitter<DragBoxEvent>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: DragBox;

  getInstance(): DragBox {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new DragBox({
      className: this.nolClassName,
      condition: this.nolCondition,
      minArea: this.nolMinArea,
      boxEndCondition: this.nolBoxEndCondition,
      onBoxEnd: this.nolOnBoxEnd,
    });

    this.instance.setActive(this.nolActive);

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<DragBoxEvent>(this.instance, 'boxcancel')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolBoxcancel.emit(evt);
      });

    fromEvent<DragBoxEvent>(this.instance, 'boxdrag')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolBoxdrag.emit(evt);
      });

    fromEvent<DragBoxEvent>(this.instance, 'boxend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolBoxend.emit(evt);
      });

    fromEvent<DragBoxEvent>(this.instance, 'boxstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolBoxstart.emit(evt);
      });

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

export function useDragBoxInteraction(): NolDragBoxInteractionComponent;
export function useDragBoxInteraction(options: InjectOptions & {optional?: false}): NolDragBoxInteractionComponent;
export function useDragBoxInteraction(options: InjectOptions): NolDragBoxInteractionComponent | null;
export function useDragBoxInteraction(options?: InjectOptions): NolDragBoxInteractionComponent | null  {
  return inject(NolDragBoxInteractionComponent, options || {}) || null;
}


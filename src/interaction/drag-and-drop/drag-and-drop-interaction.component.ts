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
import { Feature } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Geometry } from 'ol/geom';
import { ProjectionLike } from 'ol/proj';
import BaseEvent from 'ol/events/Event';
import FeatureFormat from 'ol/format/Feature';
import VectorSource from 'ol/source/Vector';
import DragAndDrop, { DragAndDropEvent, Options } from 'ol/interaction/DragAndDrop';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Interaction component that handles input of vector data by drag and drop.
 * @name nol-drag-and-drop-interaction
 * @order 1
 */
@Component({
  selector: 'nol-drag-and-drop-interaction',
  exportAs: 'nolDragAndDropInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragAndDropInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive?: boolean;
  @Input() nolFormatConstructors?: (FeatureFormat | typeof FeatureFormat)[];
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolTarget?: HTMLElement;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolAddfeatures = new EventEmitter<DragAndDropEvent>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: DragAndDrop;

  getInstance(): DragAndDrop {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new DragAndDrop({
      formatConstructors: this.nolFormatConstructors,
      source: this.nolSource,
      projection: this.nolProjection,
      target: this.nolTarget
    });

    if (typeof this.nolActive === 'boolean') {
      this.instance.setActive(this.nolActive);
    }

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<DragAndDropEvent>(this.instance, 'addfeatures')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolAddfeatures.emit(evt);
      })

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

export function useDragAndDropInteraction(): NolDragAndDropInteractionComponent;
export function useDragAndDropInteraction(options: InjectOptions & {optional?: false}): NolDragAndDropInteractionComponent;
export function useDragAndDropInteraction(options: InjectOptions): NolDragAndDropInteractionComponent | null;
export function useDragAndDropInteraction(options?: InjectOptions): NolDragAndDropInteractionComponent | null  {
  return inject(NolDragAndDropInteractionComponent, options || {}) || null;
}

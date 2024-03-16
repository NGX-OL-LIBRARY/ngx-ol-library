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
import { Collection, Feature } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import { StyleLike } from 'ol/style/Style';
import { FlatStyleLike } from 'ol/style/flat';
import BaseEvent from 'ol/events/Event';
import BaseVectorLayer from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
import Modify, { ModifyEvent, Options } from 'ol/interaction/Modify';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component for modifying feature geometries.
 * @name nol-modify-interaction
 * @order 1
 */
@Component({
  selector: 'nol-modify-interaction',
  exportAs: 'nolModifyInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolModifyInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolCondition?: Condition;
  @Input() nolDeleteCondition?: Condition;
  @Input() nolInsertVertexCondition?: Condition;
  @Input() nolPixelTolerance?: number;
  @Input() nolStyle?: StyleLike | FlatStyleLike;
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolHitDetection?: boolean | BaseVectorLayer<NolSafeAny, NolSafeAny>;
  @Input() nolFeatures?: Collection<Feature<Geometry>>;
  @Input() nolWrapX?: boolean;
  @Input() nolSnapToPointer?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolModifyend = new EventEmitter<ModifyEvent>();
  @Output() nolModifystart = new EventEmitter<ModifyEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Modify;

  getInstance(): Modify {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Modify({
      condition: this.nolCondition,
      deleteCondition: this.nolDeleteCondition,
      insertVertexCondition: this.nolInsertVertexCondition,
      pixelTolerance: this.nolPixelTolerance,
      style: this.nolStyle,
      source: this.nolSource,
      hitDetection: this.nolHitDetection,
      features: this.nolFeatures,
      wrapX: this.nolWrapX,
      snapToPointer: this.nolSnapToPointer,
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

    fromEvent<ModifyEvent>(this.instance, 'modifyend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolModifyend.emit(evt);
      });

    fromEvent<ModifyEvent>(this.instance, 'modifystart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolModifystart.emit(evt);
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

export function useModifyInteraction(): NolModifyInteractionComponent;
export function useModifyInteraction(options: InjectOptions & {optional?: false}): NolModifyInteractionComponent;
export function useModifyInteraction(options: InjectOptions): NolModifyInteractionComponent | null;
export function useModifyInteraction(options?: InjectOptions): NolModifyInteractionComponent | null  {
  return inject(NolModifyInteractionComponent, options || {}) || null;
}


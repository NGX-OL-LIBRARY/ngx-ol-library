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
import { StyleLike } from 'ol/style/Style.js';
import { FlatStyleLike } from 'ol/style/flat';
import BaseEvent from 'ol/events/Event';
import VectorSource from 'ol/source/Vector';
import Geometry, { GeometryLayout, Type as GeometryType } from 'ol/geom/Geometry';
import Draw, { DrawEvent, GeometryFunction, Options } from 'ol/interaction/Draw';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component for drawing feature geometries.
 * @name nol-draw-interaction
 * @order 1
 */
@Component({
  selector: 'nol-draw-interaction',
  exportAs: 'nolDrawInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolType!: GeometryType;
  @Input() nolClickTolerance?: number;
  @Input() nolFeatures?: Collection<Feature<Geometry>>;
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolDragVertexDelay?: number;
  @Input() nolSnapTolerance?: number;
  @Input() nolStopClick?: boolean;
  @Input() nolMaxPoints?: number;
  @Input() nolMinPoints?: number;
  @Input() nolFinishCondition?: Condition;
  @Input() nolStyle?: StyleLike | FlatStyleLike;
  @Input() nolGeometryFunction?: GeometryFunction;
  @Input() nolGeometryName?: string;
  @Input() nolCondition?: Condition;
  @Input() nolFreehand?: boolean;
  @Input() nolFreehandCondition?: Condition;
  @Input() nolTrace?: boolean | Condition;
  @Input() nolTraceSource?: VectorSource<Feature<Geometry>>;
  @Input() nolWrapX?: boolean;
  @Input() nolGeometryLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolDrawabort = new EventEmitter<DrawEvent>();
  @Output() nolDrawend = new EventEmitter<DrawEvent>();
  @Output() nolDrawstart = new EventEmitter<DrawEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Draw;

  getInstance(): Draw {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Draw({
      type: this.nolType,
      clickTolerance: this.nolClickTolerance,
      features: this.nolFeatures,
      source: this.nolSource,
      dragVertexDelay: this.nolDragVertexDelay,
      snapTolerance: this.nolSnapTolerance,
      stopClick: this.nolStopClick,
      maxPoints: this.nolMaxPoints,
      minPoints: this.nolMinPoints,
      finishCondition: this.nolFinishCondition,
      style: this.nolStyle,
      geometryFunction: this.nolGeometryFunction,
      geometryName: this.nolGeometryName,
      condition: this.nolCondition,
      freehand: this.nolFreehand,
      freehandCondition: this.nolFreehandCondition,
      trace: this.nolTrace,
      traceSource: this.nolTraceSource,
      wrapX: this.nolWrapX,
      geometryLayout: this.nolGeometryLayout,
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

    fromEvent<DrawEvent>(this.instance, 'drawabort')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolDrawabort.emit(evt);
      });

    fromEvent<DrawEvent>(this.instance, 'drawend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolDrawend.emit(evt);
      });

    fromEvent<DrawEvent>(this.instance, 'drawstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolDrawstart.emit(evt);
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

    const { nolActive, nolProperties, nolTrace } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolTrace) {
      this.instance.setTrace(nolTrace.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function useDrawInteraction(): NolDrawInteractionComponent;
export function useDrawInteraction(options: InjectOptions & {optional?: false}): NolDrawInteractionComponent;
export function useDrawInteraction(options: InjectOptions): NolDrawInteractionComponent | null;
export function useDrawInteraction(options?: InjectOptions): NolDrawInteractionComponent | null  {
  return inject(NolDrawInteractionComponent, options || {}) || null;
}

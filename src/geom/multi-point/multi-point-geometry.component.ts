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
import { debounceTime, fromEvent } from 'rxjs';
import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import { GeometryLayout } from 'ol/geom/Geometry';
import { Collection } from 'ol';
import { MultiPoint, Point } from 'ol/geom';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectGeometryHost } from 'ngx-ol-library/geom/core';

/**
 * Multi-point geometry component.
 * @name nol-multi-point-geometry
 * @order 1
 */
@Component({
  selector: 'nol-multi-point-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMultiPointGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: Coordinate[] | number[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectGeometryHost('nol-multi-point-geometry');
  private readonly points = new Collection<Point>();
  private initialCoordinates: Coordinate[] = [];
  private instance!: MultiPoint;

  getInstance() {
    return this.instance;
  }

  changed(): void {
    const coordinates = this.points
      .getArray()
      .map(item => item.getCoordinates());
    this.instance.setCoordinates([
      ...this.initialCoordinates,
      ...coordinates,
    ]);
    this.host.changed();
  }

  addPoint(point: Point): number {
    return this.points.push(point);
  }

  removePoint(point: Point): Point | undefined {
    return this.points.remove(point);
  }

  ngOnInit(): void {
    this.checkLayout();

    this.instance = new MultiPoint(this.nolCoordinates, this.nolLayout);

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    this.initialCoordinates = this.instance.getCoordinates();

    fromEvent(this.points, 'change:length')
      .pipe(
        debounceTime(10),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.changed();
      });

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
    
    this.host.addGeometry(this.instance);
  }

  ngOnChanges({ nolCoordinates, nolProperties }: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    if (nolCoordinates) {
      this.setCoordinates(nolCoordinates.currentValue);
      this.initialCoordinates = this.instance.getCoordinates();
      this.changed();
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeGeometry(this.instance);
  }

  private setCoordinates(coordinates: Coordinate[] | number[]): void {
    if (typeof coordinates[0] === 'number') {
      this.checkLayout();
      
      this.instance.setFlatCoordinates(
        this.nolLayout as GeometryLayout, 
        coordinates as number[]
      );
      this.instance.changed();
    } else {
      this.instance.setCoordinates(
        coordinates as Coordinate[], 
        this.nolLayout
      );
    }
  }

  private checkLayout(): void {
    if (typeof this.nolCoordinates[0] === 'number' && this.nolLayout === undefined) {
      throw new Error(
        `[NolMultiPointGeometryComponent] Flat coordinates must have ` +
        `nolLayout property set.`
      );
    }
  }

}

export function injectMultiPointGeometry(): NolMultiPointGeometryComponent;
export function injectMultiPointGeometry(options: InjectOptions & {optional?: false}): NolMultiPointGeometryComponent;
export function injectMultiPointGeometry(options: InjectOptions): NolMultiPointGeometryComponent | null;
export function injectMultiPointGeometry(options?: InjectOptions): NolMultiPointGeometryComponent | null  {
  return inject(NolMultiPointGeometryComponent, options || {}) || null;
}
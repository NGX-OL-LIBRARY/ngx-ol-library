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
import { MultiPolygon, Polygon } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import { Collection } from 'ol';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectGeometryHost } from 'ngx-ol-library/geom/core';

/**
 * Multi-polygon geometry component.
 * @name nol-multi-polygon-geometry
 * @order 1
 */
@Component({
  selector: 'nol-multi-polygon-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMultiPolygonGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: number[] | (Polygon | Coordinate[][])[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolEndss?: number[][];
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectGeometryHost('nol-multi-polygon-geometry');
  private readonly polygons = new Collection<Polygon>();
  private initialCoordinates: Coordinate[][][] = [];
  private instance!: MultiPolygon;

  getInstance() {
    return this.instance;
  }

  changed(): void {
    const coordinates = this.polygons
      .getArray()
      .map(item => item.getCoordinates());
    this.instance.setCoordinates([
      ...this.initialCoordinates,
      ...coordinates,
    ]);
    this.host.changed();
  }

  addPolygon(polygon: Polygon): number {
    return this.polygons.push(polygon);
  }

  removePolygon(polygon: Polygon): Polygon | undefined {
    return this.polygons.remove(polygon);
  }

  ngOnInit(): void {
    this.checkEndsAndLayout();

    this.instance = new MultiPolygon(
      this.nolCoordinates,
      this.nolLayout,
      this.nolEndss
    );

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    this.initialCoordinates = this.instance.getCoordinates();

    fromEvent(this.polygons, 'change:length')
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

  private setCoordinates(coordinates: Coordinate[][][] | number[]): void {
    if (typeof coordinates[0] === 'number') {
      this.checkEndsAndLayout();
      
      this.instance.setFlatCoordinates(
        this.nolLayout as GeometryLayout, 
        coordinates as number[]
      );
      this.instance['endss_'] = this.nolEndss;
      this.instance.changed();
    } else {
      this.instance.setCoordinates(
        coordinates as Coordinate[][][], 
        this.nolLayout
      );
    }
  }

  private checkEndsAndLayout(): void {
    if (
      typeof this.nolCoordinates[0] === 'number' &&
      (this.nolEndss === undefined || this.nolLayout === undefined)
    ) {
      throw new Error(
        `[NolMultiPolygonGeometryComponent] Flat coordinates must have ` +
        `nolLayout and nolEndss properties set.`
      );
    }
  }

}

export function injectMultiPolygonGeometry(): NolMultiPolygonGeometryComponent;
export function injectMultiPolygonGeometry(options: InjectOptions & {optional?: false}): NolMultiPolygonGeometryComponent;
export function injectMultiPolygonGeometry(options: InjectOptions): NolMultiPolygonGeometryComponent | null;
export function injectMultiPolygonGeometry(options?: InjectOptions): NolMultiPolygonGeometryComponent | null  {
  return inject(NolMultiPolygonGeometryComponent, options || {}) || null;
}
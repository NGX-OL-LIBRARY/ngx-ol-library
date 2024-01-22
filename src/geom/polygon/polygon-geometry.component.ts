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
import { fromEvent } from 'rxjs';
import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import { LinearRing, Polygon } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import Collection from 'ol/Collection';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectPolygonGeometryHost } from './utils';

/**
 * Polygon geometry component.
 * @name nol-polygon-geometry
 * @order 1
 */
@Component({
  selector: 'nol-polygon-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPolygonGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: Coordinate[][] | number[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolEnds?: number[];
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectPolygonGeometryHost();
  private readonly linearRings = new Collection<LinearRing>();
  private initialCoordinates: Coordinate[][] = [];
  private instance!: Polygon;

  getInstance() {
    return this.instance;
  }

  changed(): void {
    const coordinates = this.linearRings
      .getArray()
      .map(item => item.getCoordinates());
    this.instance.setCoordinates([
      ...this.initialCoordinates,
      ...coordinates,
    ]);
    this.host.changed();
  }

  addLinearRing(linearRing: LinearRing): void {
    this.linearRings.push(linearRing);
  }

  removeLinearRing(linearRing: LinearRing): void {
    this.linearRings.remove(linearRing);
  }

  ngOnInit(): void {
    if (typeof this.nolCoordinates[0] === 'number') {
      this.checkEndsAndLayout();
    }

    this.instance = new Polygon(
      this.nolCoordinates, 
      this.nolLayout, 
      this.nolEnds
    );

    this.initialCoordinates = this.instance.getCoordinates();

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent(this.linearRings, 'change:length')
      .pipe(takeUntilDestroyed(this.destroyRef))
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
    
    this.host.addPolygon(this.instance);
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
    this.host.addPolygon(this.instance);
  } 

  private setCoordinates(coordinates: Coordinate[][] | number[]): void {
    if (typeof coordinates[0] === 'number') {
      this.checkEndsAndLayout();
      
      this.instance.setFlatCoordinates(
        this.nolLayout as GeometryLayout, 
        coordinates as number[]
      );
      this.instance['ends_'] = this.nolEnds;
      this.instance.changed();
    } else {
      this.instance.setCoordinates(
        coordinates as Coordinate[][], 
        this.nolLayout
      );
    }
  }

  private checkEndsAndLayout(): void {
    if (this.nolEnds === undefined || this.nolLayout === undefined) {
      throw new Error(
        `[NolPolygonGeometryComponent] Flat coordinates must have nolLayout and nolEnds properties set.`
      );
    }
  }

}

export function injectPolygonGeometry(): NolPolygonGeometryComponent;
export function injectPolygonGeometry(options: InjectOptions & {optional?: false}): NolPolygonGeometryComponent;
export function injectPolygonGeometry(options: InjectOptions): NolPolygonGeometryComponent | null;
export function injectPolygonGeometry(options?: InjectOptions): NolPolygonGeometryComponent | null  {
  return inject(NolPolygonGeometryComponent, options || {}) || null;
}
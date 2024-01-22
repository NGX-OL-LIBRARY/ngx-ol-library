import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectPolygonGeometry } from 'ngx-ol-library/geom/polygon';
import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import BaseEvent from 'ol/events/Event';
import { LinearRing } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import { fromEvent } from 'rxjs';

/**
 * Linear ring geometry component.
 * @name nol-linear-ring-geometry
 * @order 1
 */
@Component({
  selector: 'nol-linear-ring-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLinearRingGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: Coordinate[] | number[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectPolygonGeometry({ host: true });
  private instance!: LinearRing;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.checkFlatCoordiantes(this.nolCoordinates);

    this.instance = new LinearRing(this.nolCoordinates, this.nolLayout);

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

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
    
    this.host.addLinearRing(this.instance);
  }

  ngOnChanges({ nolCoordinates }: SimpleChanges): void {
    if (this.instance && nolCoordinates) {
      this.checkFlatCoordiantes(nolCoordinates.currentValue);
      this.setCoordinates(nolCoordinates.currentValue);
      this.host.changed();
    }
  }

  ngOnDestroy(): void {
    this.host.removeLinearRing(this.instance);
  }

  private setCoordinates(coordinates: Coordinate[] | number[]): void {
    if (typeof coordinates[0] === 'number') {
      this.instance.setFlatCoordinates(
        this.nolLayout as GeometryLayout,
        coordinates as number[]
      );
    } else {
      this.instance.setCoordinates(coordinates as Coordinate[]);
    }
  }

  private checkFlatCoordiantes(coordinates: Coordinate[] | number[]): void {
    if (typeof coordinates[0] === 'number' && this.nolLayout === undefined) {
      throw new Error(
        `[NolLinearRingGeometryComponent] Flat coordinates must have nolLayout property set.`
      );
    }
  }

}

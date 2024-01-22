import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  InjectOptions,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ObjectEvent } from 'ol/Object';
import { Geometry, GeometryCollection } from 'ol/geom';
import Collection from 'ol/Collection';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectFeature } from 'ngx-ol-library/feature';

/**
 * An array of Geometry components.
 * @name nol-geometry-collection
 * @order 1
 */
@Component({
  selector: 'nol-geometry-collection',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGeometryCollectionComponent implements OnInit, OnDestroy {

  @Input() set nolGeometries(geometries: Geometry[]) {
    this.geometries.clear();
    this.geometries.extend(geometries);
  }

  @Input() set nolProperties(properties: Record<string, NolSafeAny>) {
    this.instance.setProperties(properties);
  }

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectFeature({ host: true });
  private readonly geometries = new Collection<Geometry>();
  private instance!: GeometryCollection;

  getInstance() {
    return this.instance;
  }

  addGeometry(geometry: Geometry): void {
    this.geometries.push(geometry);
  }

  removeGeometry(geometry: Geometry): void {
    this.geometries.remove(geometry);
  }

  ngOnInit(): void {
    const geometries = this.geometries.getArray();
    this.instance = new GeometryCollection(geometries);
    
    fromEvent(this.geometries, 'change:length')
      .pipe(
        debounceTime(10),
        map(() => this.geometries.getArray()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(geometries => {
        this.instance.setGeometries(geometries);
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

    this.host.getInstance().setGeometry(this.instance);
  }

  ngOnDestroy(): void {
    this.host.getInstance().setGeometry(undefined);
  }

}

export function injectGeometryCollection(): NolGeometryCollectionComponent;
export function injectGeometryCollection(options: InjectOptions & {optional?: false}): NolGeometryCollectionComponent;
export function injectGeometryCollection(options: InjectOptions): NolGeometryCollectionComponent | null;
export function injectGeometryCollection(options?: InjectOptions): NolGeometryCollectionComponent | null  {
  return inject(NolGeometryCollectionComponent, options || {}) || null;
}
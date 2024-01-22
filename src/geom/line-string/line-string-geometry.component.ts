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
import { LineString } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectLineStringGeometryHost } from './utils';

/**
 * Linestring geometry component.
 * @name nol-line-string-geometry
 * @order 1
 */
@Component({
  selector: 'nol-line-string-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLineStringGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: Coordinate[] | number[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectLineStringGeometryHost();
  private instance!: LineString;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new LineString(this.nolCoordinates, this.nolLayout);

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
    
    this.host.addLineString(this.instance);
    }

  ngOnChanges({ nolCoordinates, nolProperties }: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    if (nolCoordinates) {
      const coordinates = nolCoordinates.currentValue;
      if (this.nolLayout !== undefined && !Array.isArray(coordinates[0])) {
        this.instance.setFlatCoordinates(this.nolLayout, coordinates);
      } else {
        this.instance.setCoordinates(coordinates, this.nolLayout);
      }
      this.host.changed();
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeLineString(this.instance);
  } 

}

export function injectLineStringGeometry(): NolLineStringGeometryComponent;
export function injectLineStringGeometry(options: InjectOptions & {optional?: false}): NolLineStringGeometryComponent;
export function injectLineStringGeometry(options: InjectOptions): NolLineStringGeometryComponent | null;
export function injectLineStringGeometry(options?: InjectOptions): NolLineStringGeometryComponent | null  {
  return inject(NolLineStringGeometryComponent, options || {}) || null;
}
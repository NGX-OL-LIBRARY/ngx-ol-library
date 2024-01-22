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
import { Point } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectPointGeometryHost } from './utils';

/**
 * Point geometry component.
 * @name nol-point-geometry
 * @order 1
 */
@Component({
  selector: 'nol-point-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPointGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: Coordinate;
  @Input() nolLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectPointGeometryHost();
  private instance!: Point;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Point(this.nolCoordinates, this.nolLayout);

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
    
    this.host.addPoint(this.instance);
  }

  ngOnChanges({ nolCoordinates, nolProperties }: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    if (nolCoordinates) {
      this.instance.setCoordinates(nolCoordinates.currentValue, this.nolLayout);
      this.host.changed();
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removePoint(this.instance);
  }

}

export function injectPointGeometry(): NolPointGeometryComponent;
export function injectPointGeometry(options: InjectOptions & {optional?: false}): NolPointGeometryComponent;
export function injectPointGeometry(options: InjectOptions): NolPointGeometryComponent | null;
export function injectPointGeometry(options?: InjectOptions): NolPointGeometryComponent | null  {
  return inject(NolPointGeometryComponent, options || {}) || null;
}
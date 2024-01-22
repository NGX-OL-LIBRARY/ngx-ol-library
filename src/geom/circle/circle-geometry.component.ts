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
import { Circle } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectGeometryHost } from 'ngx-ol-library/geom/core';

/**
 * Circle geometry component.
 * @name nol-circle-geometry
 * @order 1
 */
@Component({
  selector: 'nol-circle-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCircleGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCenter!: Coordinate;
  @Input() nolRadius?: number;
  @Input() nolLayout?: GeometryLayout;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectGeometryHost('nol-circle-geometry');
  private instance!: Circle;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Circle(this.nolCenter, this.nolRadius, this.nolLayout);

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
    
    this.host.addGeometry(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolCenter, nolRadius, nolProperties } = changes;

    if (nolCenter && nolRadius) {
      this.instance.setCenterAndRadius(
        nolCenter.currentValue, 
        nolRadius.currentValue,
        this.nolLayout
      );
    } else if (nolCenter) {
      this.instance.setCenter(nolCenter.currentValue);
    } else if (nolRadius) {
      this.instance.setRadius(nolRadius.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeGeometry(this.instance);
  }

}

export function injectCircleGeometry(): NolCircleGeometryComponent;
export function injectCircleGeometry(options: InjectOptions & {optional?: false}): NolCircleGeometryComponent;
export function injectCircleGeometry(options: InjectOptions): NolCircleGeometryComponent | null;
export function injectCircleGeometry(options?: InjectOptions): NolCircleGeometryComponent | null  {
  return inject(NolCircleGeometryComponent, options || {}) || null;
}

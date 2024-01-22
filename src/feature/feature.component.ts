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
import { ObjectEvent } from 'ol/Object';
import { Geometry } from 'ol/geom';
import { StyleLike } from 'ol/style/Style';
import Feature from 'ol/Feature';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectFeatureHost } from './utils';

/**
 * A vector object for geographic features with a geometry and other attribute 
 * properties, similar to the features in vector file formats like GeoJSON.
 * @name nol-feature
 * @order 1
 */
@Component({
  selector: 'nol-feature',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolFeatureComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolId?: number|string;
  @Input() nolGeometry?: Geometry;
  @Input() nolGeometryName?: string;
  @Input() nolProperties?: Record<string, NolSafeAny>;
  @Input() nolStyle?: StyleLike;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolGeometryChange = new EventEmitter<Geometry>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectFeatureHost();
  private instance = new Feature();

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:geometry')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolGeometry = this.instance.getGeometry();
        this.nolGeometryChange.emit(this.nolGeometry);
        this.cdr.markForCheck();
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

    this.host.getInstance().addFeature(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nolId, nolGeometryName, nolGeometry, nolProperties, nolStyle } = changes;

    if (nolId) {
      this.instance.setId(nolId.currentValue);
    }

    if (nolGeometryName) {
      this.instance.setGeometryName(nolGeometryName.currentValue);
    }

    if (nolGeometry) {
      this.instance.setGeometry(nolGeometry.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolStyle) {
      this.instance.setStyle(nolStyle.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeFeature(this.instance);
  }

}

export function injectFeature(): NolFeatureComponent;
export function injectFeature(options: InjectOptions & {optional?: false}): NolFeatureComponent;
export function injectFeature(options: InjectOptions): NolFeatureComponent | null;
export function injectFeature(options?: InjectOptions): NolFeatureComponent | null  {
  return inject(NolFeatureComponent, options || {}) || null;
}
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
import { AttributionLike } from 'ol/source/Source';
import { Feature } from 'ol';
import { Geometry, Point } from 'ol/geom';
import { ObjectEvent } from 'ol/Object';
import { FeatureLoader } from 'ol/featureloader';
import BaseEvent from 'ol/events/Event';
import VectorSource, { VectorSourceEvent } from 'ol/source/Vector';
import Cluster, { Options } from 'ol/source/Cluster';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectVectorLayer } from 'ngx-ol-library/layer/vector';

/**
 * Layer source component to cluster vector data.
 * @name nol-cluster-source
 * @order
 */
@Component({
  selector: 'nol-cluster-source',
  exportAs: 'nolClusterSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolClusterSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolDistance?: number;
  @Input() nolLoader?: FeatureLoader;
  @Input() nolMinDistance?: number;
  @Input() nolGeometryFunction?: ((feature: Feature) => Point);
  @Input() nolCreateCluster?: ((point: Point, features: Array<Feature>) => Feature);
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolWrapX?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolAddfeature = new EventEmitter<VectorSourceEvent>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolChangefeature = new EventEmitter<VectorSourceEvent>();
  @Output() nolClear = new EventEmitter<VectorSourceEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolFeaturesloadend = new EventEmitter<VectorSourceEvent>();
  @Output() nolFeaturesloaderror = new EventEmitter<VectorSourceEvent>();
  @Output() nolFeaturesloadstart = new EventEmitter<VectorSourceEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolRemovefeature = new EventEmitter<VectorSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectVectorLayer();
  private instance!: Cluster;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Cluster({
      attributions: this.nolAttributions,
      distance: this.nolDistance,
      minDistance: this.nolMinDistance,
      geometryFunction: this.nolGeometryFunction,
      createCluster: this.nolCreateCluster,
      source: this.nolSource,
      wrapX: this.nolWrapX,
    });

    if (this.nolLoader) {
      this.instance.setLoader(this.nolLoader);
    }

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<VectorSourceEvent>(this.instance, 'addfeature')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolAddfeature.emit(evt);
      });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'changefeature')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChangefeature.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'clear')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolClear.emit(evt);
      });

    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'featuresloadend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolFeaturesloadend.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'featuresloaderror')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolFeaturesloaderror.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'featuresloadstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolFeaturesloadstart.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    fromEvent<VectorSourceEvent>(this.instance, 'removefeature')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolRemovefeature.emit(evt);
      });

    this.host.getInstance().setSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolAttributions,
      nolDistance,
      nolLoader,
      nolMinDistance,
      nolProperties,
      nolSource,
      nolUrl,
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolDistance) {
      this.instance.setDistance(nolDistance.currentValue);
    }

    if (nolLoader) {
      this.instance.setLoader(nolLoader.currentValue);
    }

    if (nolMinDistance) {
      this.instance.setMinDistance(nolMinDistance.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolSource) {
      this.instance.setSource(nolSource.currentValue);
    }

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(null);
  }

}

export function useClusterSource(): NolClusterSourceComponent;
export function useClusterSource(options: InjectOptions & {optional?: false}): NolClusterSourceComponent;
export function useClusterSource(options: InjectOptions): NolClusterSourceComponent | null;
export function useClusterSource(options?: InjectOptions): NolClusterSourceComponent | null  {
  return inject(NolClusterSourceComponent, options || {}) || null;
}

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
import { ObjectEvent } from 'ol/Object';
import { FeatureLoader, FeatureUrlFunction } from 'ol/featureloader';
import { Geometry } from 'ol/geom';
import VectorSource, { 
  LoadingStrategy, 
  Options, 
  VectorSourceEvent 
} from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Collection from 'ol/Collection';
import FeatureFormat from 'ol/format/Feature';
import BaseEvent from 'ol/events/Event';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useVectorSourceHost } from './utils';

/**
 * Provides a source of features for `nol-vector-layer` components.
 * @name nol-vector-source
 * @order 1
 */
@Component({
  selector: 'nol-vector-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorSourceComponent implements NolPrefixedOptions<Options<Feature<Geometry>>>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolFeatures?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
  @Input() nolFormat?: FeatureFormat;
  @Input() nolLoader?: FeatureLoader;
  @Input() nolOverlaps?: boolean;
  @Input() nolStrategy?: LoadingStrategy;
  @Input() nolUrl?: string | FeatureUrlFunction;
  @Input() nolUseSpatialIndex?: boolean;
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
  @Output() nolPropertychange = new EventEmitter<BaseEvent>();
  @Output() nolRemovefeature = new EventEmitter<VectorSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useVectorSourceHost();
  private instance!: VectorSource;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new VectorSource({
      attributions: this.nolAttributions,
      features: this.nolFeatures,
      format: this.nolFormat,
      loader: this.nolLoader,
      overlaps: this.nolOverlaps,
      strategy: this.nolStrategy,
      url: this.nolUrl,
      useSpatialIndex: this.nolUseSpatialIndex,
      wrapX: this.nolWrapX,
    });

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

    const { nolAttributions, nolLoader, nolProperties, nolUrl } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolLoader) {
      this.instance.setLoader(nolLoader.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(null);
  }
}

export function injectVectorSource(): NolVectorSourceComponent;
export function injectVectorSource(options: InjectOptions & {optional?: false}): NolVectorSourceComponent;
export function injectVectorSource(options: InjectOptions): NolVectorSourceComponent | null;
export function injectVectorSource(options?: InjectOptions): NolVectorSourceComponent | null  {
  return inject(NolVectorSourceComponent, options || {}) || null;
}

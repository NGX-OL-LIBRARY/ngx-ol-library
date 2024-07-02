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
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { ObjectEvent } from 'ol/Object';
import { TileSourceEvent } from 'ol/source/Tile';
import { AttributionLike } from 'ol/source/Source';
import { ProjectionLike } from 'ol/proj';
import { NearestDirectionFunction } from 'ol/array';
import BaseEvent from 'ol/events/Event';
import FeatureFormat from 'ol/format/Feature';
import Tile from 'ol/VectorTile';
import OGCVectorTile, { Options } from 'ol/source/OGCVectorTile';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useVectorTileLayer } from 'ngx-ol-library/layer/vector-tile';

/**
 * Layer source component for map tiles from an [OGC API - Tiles](https://ogcapi.ogc.org/tiles/) 
 * service that provides "vector" type tiles.
 * @name nol-ogc-vector-tile-source
 * @order 1
 */
@Component({
  selector: 'nol-ogc-vector-tile-source',
  exportAs: 'nolOGCVectorTileSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOGCVectorTileSourceComponent 
  implements NolPrefixedOptions<Options<Feature<Geometry>>>, OnInit, OnChanges, OnDestroy {

  @Input() nolUrl!: string;
  @Input() nolContext?: Record<string, NolSafeAny>;
  @Input() nolFormat!: FeatureFormat;
  @Input() nolMediaType?: string;
  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolOverlaps?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolTileClass?: typeof Tile;
  @Input() nolTransition?: number;
  @Input() nolWrapX?: boolean;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolCollections?: string[];
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useVectorTileLayer();
  private instance!: OGCVectorTile<Feature<Geometry>>;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new OGCVectorTile({
      url: this.nolUrl,
      context: this.nolContext,
      format: this.nolFormat,
      mediaType: this.nolMediaType,
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      overlaps: this.nolOverlaps,
      projection: this.nolProjection,
      tileClass: this.nolTileClass,
      transition: this.nolTransition,
      wrapX: this.nolWrapX,
      zDirection: this.nolZDirection,
      collections: this.nolCollections,
    });

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

    fromEvent<TileSourceEvent>(this.instance, 'tileloadend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolTileloadend.emit(evt);
      });

    fromEvent<TileSourceEvent>(this.instance, 'tileloaderror')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolTileloaderror.emit(evt);
      });

    fromEvent<TileSourceEvent>(this.instance, 'tileloadstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolTileloadstart.emit(evt);
      });

    this.host.getInstance().setSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolAttributions,
      nolProperties,
      nolTileLoadFunction,
      nolUrl,
      nolUrls,
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolTileLoadFunction) {
      this.instance.setTileLoadFunction(nolTileLoadFunction.currentValue);
    }

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }

    if (nolUrls) {
      this.instance.setUrls(nolUrls.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(null);
  }

}

export function useOGCVectorTileSource(): NolOGCVectorTileSourceComponent;
export function useOGCVectorTileSource(options: InjectOptions & {optional?: false}): NolOGCVectorTileSourceComponent;
export function useOGCVectorTileSource(options: InjectOptions): NolOGCVectorTileSourceComponent | null;
export function useOGCVectorTileSource(options?: InjectOptions): NolOGCVectorTileSourceComponent | null  {
  return inject(NolOGCVectorTileSourceComponent, options || {}) || null;
}

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
import { Extent } from 'ol/extent';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { ProjectionLike } from 'ol/proj';
import { AttributionLike, State } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import { Size } from 'ol/size';
import { LoadFunction, UrlFunction } from 'ol/Tile';
import { NearestDirectionFunction } from 'ol/array';
import BaseEvent from 'ol/events/Event';
import FeatureFormat from 'ol/format/Feature';
import Tile from 'ol/VectorTile';
import TileGrid from 'ol/tilegrid/TileGrid';
import VectorTile, { Options } from 'ol/source/VectorTile';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useVectorTileLayer } from 'ngx-ol-library/layer/vector-tile';

/**
 * Component for layer sources providing vector data divided into a tile grid, to be 
 * used with [VectorTileLayer](components/vector-tile-layer) component.
 * @name nol-vector-tile-source
 * @order 1
 */
@Component({
  selector: 'nol-vector-tile-source',
  exportAs: 'nolVectorTileSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorTileSourceComponent implements NolPrefixedOptions<Options<Feature<Geometry>>>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolExtent?: Extent;
  @Input() nolFormat?: FeatureFormat;
  @Input() nolOverlaps?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolState?: State;
  @Input() nolTileClass?: typeof Tile;
  @Input() nolMaxZoom?: number;
  @Input() nolMinZoom?: number;
  @Input() nolTileSize?: number | Size;
  @Input() nolMaxResolution?: number;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolTileUrlFunction?: UrlFunction;
  @Input() nolUrl?: string;
  @Input() nolTransition?: number;
  @Input() nolUrls?: string[];
  @Input() nolWrapX?: boolean;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useVectorTileLayer();
  private instance!: VectorTile<Feature<Geometry>>;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new VectorTile({
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      extent: this.nolExtent,
      format: this.nolFormat,
      overlaps: this.nolOverlaps,
      projection: this.nolProjection,
      state: this.nolState,
      tileClass: this.nolTileClass,
      maxZoom: this.nolMaxZoom,
      minZoom: this.nolMinZoom,
      tileSize: this.nolTileSize,
      maxResolution: this.nolMaxResolution,
      tileGrid: this.nolTileGrid,
      tileLoadFunction: this.nolTileLoadFunction,
      tileUrlFunction: this.nolTileUrlFunction,
      url: this.nolUrl,
      transition: this.nolTransition,
      urls: this.nolUrls,
      wrapX: this.nolWrapX,
      zDirection: this.nolZDirection,
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

export function useVectorTileSource(): NolVectorTileSourceComponent;
export function useVectorTileSource(options: InjectOptions & {optional?: false}): NolVectorTileSourceComponent;
export function useVectorTileSource(options: InjectOptions): NolVectorTileSourceComponent | null;
export function useVectorTileSource(options?: InjectOptions): NolVectorTileSourceComponent | null  {
  return inject(NolVectorTileSourceComponent, options || {}) || null;
}
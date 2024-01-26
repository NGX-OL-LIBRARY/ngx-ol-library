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
import { TileSourceEvent } from 'ol/source/Tile';
import { LoadFunction } from 'ol/Tile';
import { AttributionLike } from 'ol/source/Source';
import { ProjectionLike } from 'ol/proj';
import BaseEvent from 'ol/events/Event';
import OGCMapTile, { Options } from 'ol/source/OGCMapTile';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for map tiles from an [OGC API - Tiles](https://ogcapi.ogc.org/tiles/) 
 * service that provides "map" type tiles.
 * @name nol-ogc-map-tile-source
 * @order 1
 */
@Component({
  selector: 'nol-ogc-map-tile-source',
  exportAs: 'nolOGCMapTileSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOGCMapTileSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolUrl!: string;
  @Input() nolContext?: Record<string, NolSafeAny>;
  @Input() nolMediaType?: string;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-ogc-map-tile-source');
  private instance!: OGCMapTile;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new OGCMapTile({
      url: this.nolUrl,
      context: this.nolContext,
      mediaType: this.nolMediaType,
      projection: this.nolProjection,
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
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

    this.host.addSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolUrl,
      nolAttributions,
      nolProperties,
      nolTileLoadFunction
    } = changes;

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolTileLoadFunction) {
      this.instance.setTileLoadFunction(nolTileLoadFunction.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }
}

export function useOGCMapTileSource(): NolOGCMapTileSourceComponent;
export function useOGCMapTileSource(options: InjectOptions & {optional?: false}): NolOGCMapTileSourceComponent;
export function useOGCMapTileSource(options: InjectOptions): NolOGCMapTileSourceComponent | null;
export function useOGCMapTileSource(options?: InjectOptions): NolOGCMapTileSourceComponent | null  {
  return inject(NolOGCMapTileSourceComponent, options || {}) || null;
}

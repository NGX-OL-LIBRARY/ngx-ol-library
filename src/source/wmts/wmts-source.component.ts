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
import { ImageTile } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { LoadFunction } from 'ol/Tile';
import { NearestDirectionFunction } from 'ol/array';
import { ProjectionLike } from 'ol/proj';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import WMTS, { Options, RequestEncoding } from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for tile data from WMTS servers.
 * @name nol-wmts-source
 * @order 1
 */
@Component({
  selector: 'nol-wmts-source',
  exportAs: 'nolWMTSSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolWMTSSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolTileGrid!: WMTSTileGrid;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolRequestEncoding?: RequestEncoding;
  @Input() nolLayer!: string;
  @Input() nolStyle!: string;
  @Input() nolTileClass?: typeof ImageTile;
  @Input() nolTilePixelRatio?: number;
  @Input() nolFormat?: string;
  @Input() nolVersion?: string;
  @Input() nolMatrixSet!: string;
  @Input() nolDimensions?: Record<string, NolSafeAny>;
  @Input() nolUrl?: string;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolUrls?: string[];
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-wmts-source');
  private instance!: WMTS;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new WMTS({
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      tileGrid: this.nolTileGrid,
      projection: this.nolProjection,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      requestEncoding: this.nolRequestEncoding,
      layer: this.nolLayer,
      style: this.nolStyle,
      tileClass: this.nolTileClass,
      tilePixelRatio: this.nolTilePixelRatio,
      format: this.nolFormat,
      version: this.nolVersion,
      matrixSet: this.nolMatrixSet,
      dimensions: this.nolDimensions,
      url: this.nolUrl,
      tileLoadFunction: this.nolTileLoadFunction,
      urls: this.nolUrls,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
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

    this.host.addSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolUrl,
      nolUrls,
      nolAttributions,
      nolProperties,
      nolTileLoadFunction,
      nolDimensions,
    } = changes;

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }

    if (nolUrls) {
      this.instance.setUrls(nolUrls.currentValue);
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

    if (nolDimensions) {
      this.instance.updateDimensions(nolDimensions.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useWMTSSource(): NolWMTSSourceComponent;
export function useWMTSSource(options: InjectOptions & {optional?: false}): NolWMTSSourceComponent;
export function useWMTSSource(options: InjectOptions): NolWMTSSourceComponent | null;
export function useWMTSSource(options?: InjectOptions): NolWMTSSourceComponent | null  {
  return inject(NolWMTSSourceComponent, options || {}) || null;
}

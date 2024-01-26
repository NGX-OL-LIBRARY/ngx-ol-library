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
import { LoadFunction, UrlFunction } from 'ol/Tile';
import { NearestDirectionFunction } from 'ol/array';
import { ProjectionLike } from 'ol/proj';
import { Size } from 'ol/size';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import TileGrid from 'ol/tilegrid/TileGrid';
import XYZ, { Options } from 'ol/source/XYZ';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';


/**
 * Layer source for tile data with URLs in a set XYZ format that are defined in a URL template.
 * @name nol-xyz-source
 * @order 1
 */
@Component({
  selector: 'nol-xyz-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolXYZSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolOpaque?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolTilePixelRatio?: number;
  @Input() nolTileSize?: number|Size;
  @Input() nolGutter?: number;
  @Input() nolTileUrlFunction?: UrlFunction;
  @Input() nolUrl?: string;
  @Input() nolUrls?: string[];
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolZDirection?: number|NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-xyz-source');
  private instance!: XYZ;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new XYZ({
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      opaque: this.nolOpaque,
      projection: this.nolProjection,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      maxZoom: this.nolMaxZoom,
      minZoom: this.nolMinZoom,
      maxResolution: this.nolMaxResolution,
      tileGrid: this.nolTileGrid,
      tileLoadFunction: this.nolTileLoadFunction,
      tilePixelRatio: this.nolTilePixelRatio,
      tileSize: this.nolTileSize,
      gutter: this.nolGutter,
      tileUrlFunction: this.nolTileUrlFunction,
      url: this.nolUrl,
      urls: this.nolUrls,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
      zDirection: this.nolZDirection
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
      nolAttributions,
      nolProperties,
      nolTileLoadFunction,
      nolTileUrlFunction,
      nolUrl,
      nolUrls
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

    if (nolTileUrlFunction) {
      this.instance.setTileUrlFunction(nolTileUrlFunction.currentValue);
    }

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }

    if (nolUrls) {
      this.instance.setUrls(nolUrls.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }
}

export function injectXYZSource(): NolXYZSourceComponent;
export function injectXYZSource(options: InjectOptions & {optional?: false}): NolXYZSourceComponent;
export function injectXYZSource(options: InjectOptions): NolXYZSourceComponent | null;
export function injectXYZSource(options?: InjectOptions): NolXYZSourceComponent | null  {
  return inject(NolXYZSourceComponent, options || {}) || null;
}

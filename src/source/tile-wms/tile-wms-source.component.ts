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
import { ServerType } from 'ol/source/wms';
import BaseEvent from 'ol/events/Event';
import TileWMS, { Options } from 'ol/source/TileWMS';
import TileGrid from 'ol/tilegrid/TileGrid';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for tile data from WMS servers.
 * @name nol-tile-wms-source
 * @order 1
 */
@Component({
  selector: 'nol-tile-wms-source',
  exportAs: 'nolTileWMSSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileWMSSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolParams!: Record<string, NolSafeAny>;
  @Input() nolGutter?: number;
  @Input() nolHidpi?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileClass?: typeof ImageTile;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolServerType?: ServerType;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolUrl?: string;
  @Input() nolUrls?: string[];
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
  private readonly host = useTileImageSourceHost('nol-tile-wms-source');
  private instance!: TileWMS;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new TileWMS({
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      params: this.nolParams,
      gutter: this.nolGutter,
      hidpi: this.nolHidpi,
      projection: this.nolProjection,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileClass: this.nolTileClass,
      tileGrid: this.nolTileGrid,
      serverType: this.nolServerType,
      tileLoadFunction: this.nolTileLoadFunction,
      url: this.nolUrl,
      urls: this.nolUrls,
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
      nolParams,
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

    if (nolParams) {
      this.instance.updateParams(nolParams.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useTileWMSSource(): NolTileWMSSourceComponent;
export function useTileWMSSource(options: InjectOptions & {optional?: false}): NolTileWMSSourceComponent;
export function useTileWMSSource(options: InjectOptions): NolTileWMSSourceComponent | null;
export function useTileWMSSource(options?: InjectOptions): NolTileWMSSourceComponent | null  {
  return inject(NolTileWMSSourceComponent, options || {}) || null;
}


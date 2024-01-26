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
import { LoadFunction } from 'ol/Tile';
import { NearestDirectionFunction } from 'ol/array';
import { ProjectionLike } from 'ol/proj';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import TileArcGISRest, { Options } from 'ol/source/TileArcGISRest';
import TileGrid from 'ol/tilegrid/TileGrid';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source for tile data from ArcGIS Rest services. 
 * @name nol-tile-arcgis-reset-source
 * @order 1
 */
@Component({
  selector: 'nol-tile-arcgis-reset-source',
  exportAs: 'nolTileArcGISRestSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileArcGISRestSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolParams?: Record<string, NolSafeAny>;
  @Input() nolHidpi?: boolean;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolUrl?: string;
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolUrls?: string[];
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-tile-arcgis-reset-source');
  private instance!: TileArcGISRest;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new TileArcGISRest({
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      params: this.nolParams,
      hidpi: this.nolHidpi,
      tileGrid: this.nolTileGrid,
      projection: this.nolProjection,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
      url: this.nolUrl,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
      urls: this.nolUrls,
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

export function useTileArcGISRestSource(): NolTileArcGISRestSourceComponent;
export function useTileArcGISRestSource(options: InjectOptions & {optional?: false}): NolTileArcGISRestSourceComponent;
export function useTileArcGISRestSource(options: InjectOptions): NolTileArcGISRestSourceComponent | null;
export function useTileArcGISRestSource(options?: InjectOptions): NolTileArcGISRestSourceComponent | null  {
  return inject(NolTileArcGISRestSourceComponent, options || {}) || null;
}


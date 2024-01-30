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
import { NearestDirectionFunction } from 'ol/array';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import { Size } from 'ol/size';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import Zoomify, { Options, TierSizeCalculation } from 'ol/source/Zoomify';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for tile data in Zoomify format.
 * @name nol-zoomify-source
 * @order 1
 */
@Component({
  selector: 'nol-zoomify-source',
  exportAs: 'nolZoomifySource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomifySourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolTilePixelRatio?: number;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolUrl!: string;
  @Input() nolTierSizeCalculation?: TierSizeCalculation
  @Input() nolSize!: Size;
  @Input() nolExtent?: Extent;
  @Input() nolTransition?: number;
  @Input() nolTileSize?: number;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-zoomify-source');
  private instance!: Zoomify;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Zoomify({
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      projection: this.nolProjection,
      tilePixelRatio: this.nolTilePixelRatio,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      url: this.nolUrl,
      tierSizeCalculation: this.nolTierSizeCalculation,
      size: this.nolSize,
      extent: this.nolExtent,
      transition: this.nolTransition,
      tileSize: this.nolTileSize,
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
      nolAttributions,
      nolProperties,
      nolTileLoadFunction,
      nolUrl,
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
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useZoomifySource(): NolZoomifySourceComponent;
export function useZoomifySource(options: InjectOptions & {optional?: false}): NolZoomifySourceComponent;
export function useZoomifySource(options: InjectOptions): NolZoomifySourceComponent | null;
export function useZoomifySource(options?: InjectOptions): NolZoomifySourceComponent | null  {
  return inject(NolZoomifySourceComponent, options || {}) || null;
}
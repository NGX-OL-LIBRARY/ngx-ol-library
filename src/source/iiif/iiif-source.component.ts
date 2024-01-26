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
import { Versions } from 'ol/format/IIIFInfo';
import { TileSourceEvent } from 'ol/source/Tile';
import { AttributionLike, State } from 'ol/source/Source';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import { Size } from 'ol/size';
import BaseEvent from 'ol/events/Event';
import IIIF, { Options } from 'ol/source/IIIF';
import { NearestDirectionFunction } from 'ol/array';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for IIIF Image API services.
 * @name nol-iiif-source
 * @order 1
 */
@Component({
  selector: 'nol-iiif-source',
  exportAs: 'nolIIIFSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolIIIFSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolExtent?: Extent;
  @Input() nolFormat?: string;
  @Input() nolInterpolate?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolQuality?: string;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolResolutions?: number[];
  @Input() nolSize!: Size;
  @Input() nolSizes?: Size[];
  @Input() nolState?: State;
  @Input() nolSupports?: string[];
  @Input() nolTilePixelRatio?: number;
  @Input() nolTileSize?: number | Size;
  @Input() nolTransition?: number;
  @Input() nolUrl?: string;
  @Input() nolVersion?: Versions;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-iiif-source');
  private instance!: IIIF;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new IIIF({
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      extent: this.nolExtent,
      format: this.nolFormat,
      interpolate: this.nolInterpolate,
      projection: this.nolProjection,
      quality: this.nolQuality,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      resolutions: this.nolResolutions,
      size: this.nolSize,
      sizes: this.nolSizes,
      state: this.nolState,
      supports: this.nolSupports,
      tilePixelRatio: this.nolTilePixelRatio,
      tileSize: this.nolTileSize,
      transition: this.nolTransition,
      url: this.nolUrl,
      version: this.nolVersion,
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

export function useIIIFSource(): NolIIIFSourceComponent;
export function useIIIFSource(options: InjectOptions & {optional?: false}): NolIIIFSourceComponent;
export function useIIIFSource(options: InjectOptions): NolIIIFSourceComponent | null;
export function useIIIFSource(options?: InjectOptions): NolIIIFSourceComponent | null  {
  return inject(NolIIIFSourceComponent, options || {}) || null;
}
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
import { NearestDirectionFunction } from 'ol/array';
import BaseEvent from 'ol/events/Event';
import BingMaps, { Options } from 'ol/source/BingMaps';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for Bing Maps tile data.
 * @name nol-bing-maps-source
 * @order 1
 */
@Component({
  selector: 'nol-bing-maps-source',
  exportAs: 'nolBingMapsSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBingMapsSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolCacheSize?: number;
  @Input() nolHidpi?: boolean;
  @Input() nolCulture?: string;
  @Input() nolKey!: string;
  @Input() nolImagerySet!: string;
  @Input() nolInterpolate?: boolean;
  @Input() nolMaxZoom?: number;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolPlaceholderTiles?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;
  
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-bing-maps-source');
  private instance!: BingMaps;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new BingMaps({
      cacheSize: this.nolCacheSize,
      hidpi: this.nolHidpi,
      culture: this.nolCulture,
      key: this.nolKey,
      imagerySet: this.nolImagerySet,
      interpolate: this.nolInterpolate,
      maxZoom: this.nolMaxZoom,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
      zDirection: this.nolZDirection,
      placeholderTiles: this.nolPlaceholderTiles,
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
      nolTileLoadFunction
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
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useBingMapsSource(): NolBingMapsSourceComponent;
export function useBingMapsSource(options: InjectOptions & {optional?: false}): NolBingMapsSourceComponent;
export function useBingMapsSource(options: InjectOptions): NolBingMapsSourceComponent | null;
export function useBingMapsSource(options?: InjectOptions): NolBingMapsSourceComponent | null  {
  return inject(NolBingMapsSourceComponent, options || {}) || null;
}

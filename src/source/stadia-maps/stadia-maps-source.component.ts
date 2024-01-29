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
import { AttributionLike } from 'ol/source/Source';
import BaseEvent from 'ol/events/Event';
import StadiaMaps, { Options } from 'ol/source/StadiaMaps';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for the Stadia Maps tile server.
 * @name nol-stadia-maps-source
 * @order 1
 */
@Component({
  selector: 'nol-stadia-maps-source',
  exportAs: 'nolStadiaMapsSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStadiaMapsSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolInterpolate?: boolean;
  @Input() nolLayer!: string;
  @Input() nolMinZoom?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolTransition?: number;
  @Input() nolUrl?: string;
  @Input() nolWrapX?: boolean;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolApiKey?: string;
  @Input() nolRetina?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-stadia-maps-source');
  private instance!: StadiaMaps;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new StadiaMaps({
      cacheSize: this.nolCacheSize,
      interpolate: this.nolInterpolate,
      layer: this.nolLayer,
      minZoom: this.nolMinZoom,
      maxZoom: this.nolMaxZoom,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
      transition: this.nolTransition,
      url: this.nolUrl,
      wrapX: this.nolWrapX,
      zDirection: this.nolZDirection,
      apiKey: this.nolApiKey,
      retina: this.nolRetina,
    });

    if (this.nolAttributions) {
      this.instance.setAttributions(this.nolAttributions);
    }

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

export function useStadiaMapsSource(): NolStadiaMapsSourceComponent;
export function useStadiaMapsSource(options: InjectOptions & {optional?: false}): NolStadiaMapsSourceComponent;
export function useStadiaMapsSource(options: InjectOptions): NolStadiaMapsSourceComponent | null;
export function useStadiaMapsSource(options?: InjectOptions): NolStadiaMapsSourceComponent | null  {
  return inject(NolStadiaMapsSourceComponent, options || {}) || null;
}


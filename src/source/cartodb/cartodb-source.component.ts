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
import { TileSourceEvent } from 'ol/source/Tile';
import { AttributionLike } from 'ol/source/Source';
import { ProjectionLike } from 'ol/proj';
import BaseEvent from 'ol/events/Event';
import CartoDB, { Options } from 'ol/source/CartoDB';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for the CartoDB Maps API.
 * @name nol-cartodb-source
 * @order 1
 */
@Component({
  selector: 'nol-cartodb-source',
  exportAs: 'nolCartoDBSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCartoDBSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolMaxZoom?: number;
  @Input() nolMinZoom?: number;
  @Input() nolWrapX?: boolean;
  @Input() nolConfig?: Record<string, NolSafeAny>;
  @Input() nolMap?: string;
  @Input() nolAccount?: string;
  @Input() nolTransition?: number;
  @Input() nolZDirection?: number|NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-cartodb-source');
  private instance!: CartoDB;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new CartoDB({
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      projection: this.nolProjection,
      maxZoom: this.nolMaxZoom,
      minZoom: this.nolMinZoom,
      wrapX: this.nolWrapX,
      config: this.nolConfig,
      map: this.nolMap,
      account: this.nolAccount,
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
      nolAttributions,
      nolConfig,
      nolProperties,
      nolTileLoadFunction,
      nolUrl,
      nolUrls
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolConfig) {
      this.instance.setConfig(nolConfig.currentValue);
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
    this.host.removeSource(this.instance);
  }

}

export function useCartoDBSource(): NolCartoDBSourceComponent;
export function useCartoDBSource(options: InjectOptions & {optional?: false}): NolCartoDBSourceComponent;
export function useCartoDBSource(options: InjectOptions): NolCartoDBSourceComponent | null;
export function useCartoDBSource(options?: InjectOptions): NolCartoDBSourceComponent | null  {
  return inject(NolCartoDBSourceComponent, options || {}) || null;
}
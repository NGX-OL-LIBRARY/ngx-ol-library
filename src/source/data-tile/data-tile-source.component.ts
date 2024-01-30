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
import { AttributionLike, State } from 'ol/source/Source';
import { Size } from 'ol/size';
import { ProjectionLike } from 'ol/proj';
import BaseEvent from 'ol/events/Event';
import DataTileSource, { Loader, Options } from 'ol/source/DataTile';
import TileGrid from 'ol/tilegrid/TileGrid';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useDataTileSourceHost } from 'ngx-ol-library/source/core';

/**
 * A source component for typed array data tiles.
 * @name nol-data-tile-source
 * @order 1
 */
@Component({
  selector: 'nol-data-tile-source',
  exportAs: 'nolDataTileSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDataTileSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolLoader?: Loader;
  @Input() nolAttributions?: AttributionLike;
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolMaxZoom?: number;
  @Input() nolMinZoom?: number;
  @Input() nolTileSize?: number | Size;
  @Input() nolGutter?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolOpaque?: boolean;
  @Input() nolState?: State;
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolBandCount?: number;
  @Input() nolInterpolate?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useDataTileSourceHost('nol-data-tile-source');
  private instance!: DataTileSource;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new DataTileSource({
      loader: this.nolLoader,
      attributions: this.nolAttributions,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      maxZoom: this.nolMaxZoom,
      minZoom: this.nolMinZoom,
      tileSize: this.nolTileSize,
      gutter: this.nolGutter,
      maxResolution: this.nolMaxResolution,
      projection: this.nolProjection,
      tileGrid: this.nolTileGrid,
      opaque: this.nolOpaque,
      state: this.nolState,
      wrapX: this.nolWrapX,
      transition: this.nolTransition,
      bandCount: this.nolBandCount,
      interpolate: this.nolInterpolate,
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
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useDataTileSource(): NolDataTileSourceComponent;
export function useDataTileSource(options: InjectOptions & {optional?: false}): NolDataTileSourceComponent;
export function useDataTileSource(options: InjectOptions): NolDataTileSourceComponent | null;
export function useDataTileSource(options?: InjectOptions): NolDataTileSourceComponent | null  {
  return inject(NolDataTileSourceComponent, options || {}) || null;
}
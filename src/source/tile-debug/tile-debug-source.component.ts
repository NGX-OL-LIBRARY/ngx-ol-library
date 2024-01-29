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
import { ProjectionLike } from 'ol/proj';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import TileDebug, { Options } from 'ol/source/TileDebug';
import TileGrid from 'ol/tilegrid/TileGrid';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * A pseudo tile source component, which does not fetch tiles from a server, 
 * but renders a grid outline for the tile grid/projection along with the coordinates 
 * for each tile. 
 * @name nol-tile-debug-source
 * @order 1
 */
@Component({
  selector: 'nol-tile-debug-source',
  exportAs: 'nolTileDebugSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileDebugSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolProjection?: ProjectionLike;
  @Input() nolTileGrid?: TileGrid;
  @Input() nolWrapX?: boolean;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolTemplate?: string;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-tile-debug-source');
  private instance!: TileDebug;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new TileDebug({
      projection: this.nolProjection,
      tileGrid: this.nolTileGrid,
      wrapX: this.nolWrapX,
      zDirection: this.nolZDirection,
      template: this.nolTemplate,
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

    const { nolProperties } = changes;

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useTileDebugSource(): NolTileDebugSourceComponent;
export function useTileDebugSource(options: InjectOptions & {optional?: false}): NolTileDebugSourceComponent;
export function useTileDebugSource(options: InjectOptions): NolTileDebugSourceComponent | null;
export function useTileDebugSource(options?: InjectOptions): NolTileDebugSourceComponent | null  {
  return inject(NolTileDebugSourceComponent, options || {}) || null;
}
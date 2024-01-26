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
import { LoadFunction } from 'ol/Tile';
import { NearestDirectionFunction } from 'ol/array';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import OSM, { Options } from 'ol/source/OSM';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for the OpenStreetMap tile server.
 * @name nol-osm-source
 * @order 1
 */
@Component({
  selector: 'nol-osm-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOSMSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolMaxZoom?: number;
  @Input() nolOpaque?: boolean;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolTransition?: number;
  @Input() nolUrl?: string;
  @Input() nolWrapX?: boolean;
  @Input() nolZDirection?: number | NearestDirectionFunction;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-osm-source');
  private instance!: OSM;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new OSM({
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      maxZoom: this.nolMaxZoom,
      opaque: this.nolOpaque,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
      transition: this.nolTransition,
      url: this.nolUrl,
      wrapX: this.nolWrapX,
      zDirection: this.nolZDirection,
    });

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

    const { nolAttributions, nolTileLoadFunction, nolUrl } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
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

export function injectOSMSource(): NolOSMSourceComponent;
export function injectOSMSource(options: InjectOptions & {optional?: false}): NolOSMSourceComponent;
export function injectOSMSource(options: InjectOptions): NolOSMSourceComponent | null;
export function injectOSMSource(options?: InjectOptions): NolOSMSourceComponent | null  {
  return inject(NolOSMSourceComponent, options || {}) || null;
}

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
import { Size } from 'ol/size';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import TileJSON, { Config, Options } from 'ol/source/TileJSON';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectTileLayer } from 'ngx-ol-library/layer/tile';

/**
 * Layer source component for tile data in TileJSON format.
 * @name nol-tile-json-source
 * @order 1
 */
@Component({
  selector: 'nol-tile-json-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileJSONSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCacheSize?: number;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolInterpolate?: boolean;
  @Input() nolJsonp?: boolean;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileJSON?: Config;
  @Input() nolTileLoadFunction?: LoadFunction;
  @Input() nolTileSize?: number | Size;
  @Input() nolUrl?: string;
  @Input() nolWrapX?: boolean;
  @Input() nolTransition?: number;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectTileLayer({ host: true });
  private instance!: TileJSON;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new TileJSON({
      attributions: this.nolAttributions,
      cacheSize: this.nolCacheSize,
      crossOrigin: this.nolCrossOrigin,
      interpolate: this.nolInterpolate,
      jsonp: this.nolJsonp,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileJSON: this.nolTileJSON,
      tileLoadFunction: this.nolTileLoadFunction,
      tileSize: this.nolTileSize,
      url: this.nolUrl,
      wrapX: this.nolWrapX,
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

    this.host.getInstance().setSource(this.instance);
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
    this.host.getInstance().setSource(null);
  }

}

export function injectTileJSONSource(): NolTileJSONSourceComponent;
export function injectTileJSONSource(options: InjectOptions & {optional?: false}): NolTileJSONSourceComponent;
export function injectTileJSONSource(options: InjectOptions): NolTileJSONSourceComponent | null;
export function injectTileJSONSource(options?: InjectOptions): NolTileJSONSourceComponent | null  {
  return inject(NolTileJSONSourceComponent, options || {}) || null;
}
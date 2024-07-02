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
import { NearestDirectionFunction } from 'ol/array';
import { LoadFunction } from 'ol/Tile';
import { ObjectEvent } from 'ol/Object';
import { TileSourceEvent } from 'ol/source/Tile';
import BaseEvent from 'ol/events/Event';
import Google, { Options } from 'ol/source/Google';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * A tile layer source component that renders tiles from 
 * the Google [Map Tiles API](https://developers.google.com/maps/documentation/tile/overview).
 * @name nol-google-source
 * @order 1
 */
@Component({
  selector: 'nol-google-source',
  exportAs: 'nolGoogleSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGoogleSourceComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolKey!: string;
  @Input() nolMapType?: string;
  @Input() nolLanguage?: string;
  @Input() nolRegion?: string;
  @Input() nolImageFormat?: string;
  @Input() nolScale?: string;
  @Input() nolHighDpi?: boolean;
  @Input() nolLayerTypes?: string[];
  @Input() nolOverlay?: boolean;
  @Input() nolStyles?: NolSafeAny[];
  @Input() nolAttributionsCollapsible?: boolean;
  @Input() nolInterpolate?: boolean;
  @Input() nolCacheSize?: number;
  @Input() nolReprojectionErrorThreshold?: number;
  @Input() nolTileLoadFunction?: LoadFunction;
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

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileImageSourceHost('nol-google-source');
  private instance!: Google;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Google({
      key: this.nolKey,
      mapType: this.nolMapType,
      language: this.nolLanguage,
      region: this.nolRegion,
      imageFormat: this.nolImageFormat,
      scale: this.nolScale,
      highDpi: this.nolHighDpi,
      layerTypes: this.nolLayerTypes,
      overlay: this.nolOverlay,
      styles: this.nolStyles,
      attributionsCollapsible: this.nolAttributionsCollapsible,
      interpolate: this.nolInterpolate,
      cacheSize: this.nolCacheSize,
      reprojectionErrorThreshold: this.nolReprojectionErrorThreshold,
      tileLoadFunction: this.nolTileLoadFunction,
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

    this.host.addSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolProperties,
      nolTileLoadFunction
    } = changes;

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

export function useGoogleSource(): NolGoogleSourceComponent;
export function useGoogleSource(options: InjectOptions & {optional?: false}): NolGoogleSourceComponent;
export function useGoogleSource(options: InjectOptions): NolGoogleSourceComponent | null;
export function useGoogleSource(options?: InjectOptions): NolGoogleSourceComponent | null  {
  return inject(NolGoogleSourceComponent, options || {}) || null;
}

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
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ObjectEvent } from 'ol/Object';
import { TileSourceEvent } from 'ol/source/Tile';
import { ProjectionLike } from 'ol/proj';
import { AttributionLike } from 'ol/source/Source';
import BaseEvent from 'ol/events/Event';
import GeoTIFFSource, { 
  GeoTIFFSourceOptions, 
  Options, 
  SourceInfo 
} from 'ol/source/GeoTIFF';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useDataTileSourceHost } from 'ngx-ol-library/source/core';

/**
 * A source component for working with GeoTIFF data.
 * @name nol-geotiff-source
 * @order 1
 */
@Component({
  selector: 'nol-geotiff-source',
  exportAs: 'nolGeoTIFFSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGeoTIFFSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolSources!: Array<SourceInfo>;
  @Input() nolSourceOptions?: GeoTIFFSourceOptions;
  @Input() nolConvertToRGB?: boolean | 'auto';
  @Input() nolNormalize?: boolean;
  @Input() nolOpaque?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolTransition?: number;
  @Input() nolWrapX?: boolean;
  @Input() nolInterpolate?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() nolTileloadstart = new EventEmitter<TileSourceEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useDataTileSourceHost('nol-geotiff-source');
  private instance!: GeoTIFFSource;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new GeoTIFFSource({
      sources: this.nolSources,
      sourceOptions: this.nolSourceOptions,
      convertToRGB: this.nolConvertToRGB,
      normalize: this.nolNormalize,
      opaque: this.nolOpaque,
      projection: this.nolProjection,
      transition: this.nolTransition,
      wrapX: this.nolWrapX,
      interpolate: this.nolInterpolate,
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

export function useGeoTIFFSource(): NolGeoTIFFSourceComponent;
export function useGeoTIFFSource(options: InjectOptions & {optional?: false}): NolGeoTIFFSourceComponent;
export function useGeoTIFFSource(options: InjectOptions): NolGeoTIFFSourceComponent | null;
export function useGeoTIFFSource(options?: InjectOptions): NolGeoTIFFSourceComponent | null  {
  return inject(NolGeoTIFFSourceComponent, options || {}) || null;
}

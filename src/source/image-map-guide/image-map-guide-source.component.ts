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
import { LoadFunction } from 'ol/Image';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj.js';
import { ImageSourceEvent } from 'ol/source/Image';
import BaseEvent from 'ol/events/Event';
import ImageMapGuide, { Options } from 'ol/source/ImageMapGuide';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectImageLayer } from 'ngx-ol-library/layer/image';

/**
 * Source component for images from Mapguide servers.
 * @name nol-image-map-guide-source
 * @order 1
 */
@Component({
  selector: 'nol-image-map-guide-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageMapGuideSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolUrl?: string;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolDisplayDpi?: number;
  @Input() nolMetersPerUnit?: number;
  @Input() nolHidpi?: boolean;
  @Input() nolUseOverlay?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolRatio?: number;
  @Input() nolResolutions?: number[];
  @Input() nolImageLoadFunction?: LoadFunction;
  @Input() nolInterpolate?: boolean;
  @Input() nolParams?: Record<string, NolSafeAny>;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolImageloadend = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloaderror = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloadstart = new EventEmitter<ImageSourceEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectImageLayer({ host: true });
  private instance!: ImageMapGuide;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ImageMapGuide({
      url: this.nolUrl,
      crossOrigin: this.nolCrossOrigin,
      displayDpi: this.nolDisplayDpi,
      metersPerUnit: this.nolMetersPerUnit,
      hidpi: this.nolHidpi,
      useOverlay: this.nolUseOverlay,
      projection: this.nolProjection,
      ratio: this.nolRatio,
      resolutions: this.nolResolutions,
      imageLoadFunction: this.nolImageLoadFunction,
      interpolate: this.nolInterpolate,
      params: this.nolParams,
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

    fromEvent<ImageSourceEvent>(this.instance, 'imageloadend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolImageloadend.emit(evt);
      });

    fromEvent<ImageSourceEvent>(this.instance, 'imageloaderror')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolImageloaderror.emit(evt);
      });

    fromEvent<ImageSourceEvent>(this.instance, 'imageloadstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolImageloadstart.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    this.host.getInstance().setSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolAttributions,
      nolImageLoadFunction,
      nolProperties,
      nolParams,
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolImageLoadFunction) {
      this.instance.setImageLoadFunction(nolImageLoadFunction.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolParams) {
      this.instance.updateParams(nolParams.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(null);
  }

}

export function injectImageMapGuideSource(): NolImageMapGuideSourceComponent;
export function injectImageMapGuideSource(options: InjectOptions & {optional?: false}): NolImageMapGuideSourceComponent;
export function injectImageMapGuideSource(options: InjectOptions): NolImageMapGuideSourceComponent | null;
export function injectImageMapGuideSource(options?: InjectOptions): NolImageMapGuideSourceComponent | null  {
  return inject(NolImageMapGuideSourceComponent, options || {}) || null;
}

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
import { ProjectionLike } from 'ol/proj';
import { ImageSourceEvent } from 'ol/source/Image';
import BaseEvent from 'ol/events/Event';
import ImageArcGISRest, { Options } from 'ol/source/ImageArcGISRest';
import { AttributionLike } from 'ol/source/Source';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectImageLayer } from 'ngx-ol-library/layer/image';

/**
 * Source component for data from ArcGIS Rest services.
 * @name nol-image-arcgis-rest-source
 * @order 1
 */
@Component({
  selector: 'nol-image-arcgis-rest-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageArcGISRestSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolHidpi?: boolean;
  @Input() nolImageLoadFunction?: LoadFunction;
  @Input() nolInterpolate?: boolean;
  @Input() nolParams?: Record<string, NolSafeAny>;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolRatio?: number;
  @Input() nolResolutions?: number[];
  @Input() nolUrl?: string;
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
  private instance!: ImageArcGISRest;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ImageArcGISRest({
      attributions: this.nolAttributions,
      crossOrigin: this.nolCrossOrigin,
      hidpi: this.nolHidpi,
      imageLoadFunction: this.nolImageLoadFunction,
      interpolate: this.nolInterpolate,
      params: this.nolParams,
      projection: this.nolProjection,
      ratio: this.nolRatio,
      resolutions: this.nolResolutions,
      url: this.nolUrl
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
      nolUrl,
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

    if (nolUrl) {
      this.instance.setUrl(nolUrl.currentValue);
    }

    if (nolParams) {
      this.instance.updateParams(nolParams.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(null);
  }

}

export function injectImageArcGISRestSource(): NolImageArcGISRestSourceComponent;
export function injectImageArcGISRestSource(options: InjectOptions & {optional?: false}): NolImageArcGISRestSourceComponent;
export function injectImageArcGISRestSource(options: InjectOptions): NolImageArcGISRestSourceComponent | null;
export function injectImageArcGISRestSource(options?: InjectOptions): NolImageArcGISRestSourceComponent | null  {
  return inject(NolImageArcGISRestSourceComponent, options || {}) || null;
}

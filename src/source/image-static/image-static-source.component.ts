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
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import { ImageSourceEvent } from 'ol/source/Image';
import BaseEvent from 'ol/events/Event';
import Static, { Options } from 'ol/source/ImageStatic';
import { AttributionLike } from 'ol/source/Source';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * A layer source component for displaying a single, static image.
 * @name nol-image-static-source
 * @order 1
 */
@Component({
  selector: 'nol-image-static-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageStaticSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolImageExtent!: Extent;
  @Input() nolImageLoadFunction?: LoadFunction;
  @Input() nolInterpolate?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolUrl!: string;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolImageloadend = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloaderror = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloadstart = new EventEmitter<ImageSourceEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useImageSourceHost('nol-image-static-source');
  private instance!: Static;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Static({
      attributions: this.nolAttributions,
      crossOrigin: this.nolCrossOrigin,
      imageExtent: this.nolImageExtent,
      imageLoadFunction: this.nolImageLoadFunction,
      interpolate: this.nolInterpolate,
      projection: this.nolProjection,
      url: this.nolUrl,
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

    this.host.addSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolAttributions, nolProperties } = changes;

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

export function injectImageStaticSource(): NolImageStaticSourceComponent;
export function injectImageStaticSource(options: InjectOptions & {optional?: false}): NolImageStaticSourceComponent;
export function injectImageStaticSource(options: InjectOptions): NolImageStaticSourceComponent | null;
export function injectImageStaticSource(options?: InjectOptions): NolImageStaticSourceComponent | null  {
  return inject(NolImageStaticSourceComponent, options || {}) || null;
}
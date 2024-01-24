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
import { ProjectionLike } from 'ol/proj';
import { AttributionLike, State } from 'ol/source/Source';
import { ImageSourceEvent } from 'ol/source/Image';
import BaseEvent from 'ol/events/Event';
import ImageCanvasSource, { FunctionType, Options } from 'ol/source/ImageCanvas';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useImageSourceHost } from 'ngx-ol-library/source/core';

/**
 * Base component for image sources where a canvas element is the image.
 * @name nol-image-canvas-source
 * @order 1
 */
@Component({
  selector: 'nol-image-canvas-source',
  exportAs: 'nolImageCanvasSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageCanvasSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolCanvasFunction?: FunctionType;
  @Input() nolInterpolate?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolRatio?: number;
  @Input() nolResolutions?: number[];
  @Input() nolState?: State;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolImageloadend = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloaderror = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloadstart = new EventEmitter<ImageSourceEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useImageSourceHost('nol-image-canvas-source');
  private instance!: ImageCanvasSource;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new ImageCanvasSource({
      attributions: this.nolAttributions,
      canvasFunction: this.nolCanvasFunction,
      interpolate: this.nolInterpolate,
      projection: this.nolProjection,
      ratio: this.nolRatio,
      resolutions: this.nolResolutions,
      state: this.nolState,
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

export function useImageCanvasSource(): NolImageCanvasSourceComponent;
export function useImageCanvasSource(options: InjectOptions & {optional?: false}): NolImageCanvasSourceComponent;
export function useImageCanvasSource(options: InjectOptions): NolImageCanvasSourceComponent | null;
export function useImageCanvasSource(options?: InjectOptions): NolImageCanvasSourceComponent | null  {
  return inject(NolImageCanvasSourceComponent, options || {}) || null;
}
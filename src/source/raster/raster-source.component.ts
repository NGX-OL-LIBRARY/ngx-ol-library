import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  InjectOptions,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { Collection } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { ImageSourceEvent } from 'ol/source/Image';
import BaseEvent from 'ol/events/Event';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import RasterSource, {
  Operation,
  Options,
  RasterOperationType,
  RasterSourceEvent
} from 'ol/source/Raster';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectImageLayer } from 'ngx-ol-library/layer/image';

/**
 * A source component that transforms data from any number of input sources using 
 * an [Operation](https://openlayers.org/en/latest/apidoc/module-ol_source_Raster.html#~Operation) 
 * function to transform input pixel values into output pixel values.
 * @name nol-raster-source
 * @order 1
 */
@Component({
  selector: 'nol-raster-source',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRasterSourceComponent implements NolPrefixedOptions<Options>, AfterViewInit, OnChanges, OnDestroy {

  @Input() 
  get nolSources() { return this.sources.getArray() }
  set nolSources(sources: Array<Source | Layer>) {
    this.sources.clear();
    this.sources.extend(sources);
  }

  @Input() nolOperation?: Operation;
  @Input() nolLib?: Record<string, NolSafeAny>;
  @Input() nolThreads?: number;
  @Input() nolOperationType?: RasterOperationType;
  @Input() nolResolutions?: number[] | null;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolAfteroperations = new EventEmitter<RasterSourceEvent>();
  @Output() nolBeforeoperations = new EventEmitter<RasterSourceEvent>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolImageloadend = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloaderror = new EventEmitter<ImageSourceEvent>();
  @Output() nolImageloadstart = new EventEmitter<ImageSourceEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectImageLayer({ host: true });
  private readonly sources = new Collection<Source | Layer>();
  private instance!: RasterSource;

  getInstance() {
    return this.instance;
  }

  addSource(source: Source|Layer): number {
    return this.sources.push(source);
  }

  removeSource(source: Source|Layer):Source|Layer|undefined {
    return this.sources.remove(source);
  }    

  ngAfterViewInit(): void {
    this.instance = new RasterSource({
      sources: this.sources.getArray(),
      operation: this.nolOperation,
      lib: this.nolLib,
      threads: this.nolThreads,
      operationType: this.nolOperationType,
      resolutions: this.nolResolutions
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<RasterSourceEvent>(this.instance, 'afteroperations')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolAfteroperations.emit(evt);
      });

    fromEvent<RasterSourceEvent>(this.instance, 'beforeoperations')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolBeforeoperations.emit(evt);
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
      nolOperation,
      nolProperties,
      nolResolutions
    } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolOperation) {
      this.instance.setOperation(nolOperation.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolResolutions) {
      this.instance.setResolutions(nolResolutions.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setSource(this.instance);
  }

}

export function injectRasterSource(): NolRasterSourceComponent;
export function injectRasterSource(options: InjectOptions & {optional?: false}): NolRasterSourceComponent;
export function injectRasterSource(options: InjectOptions): NolRasterSourceComponent | null;
export function injectRasterSource(options?: InjectOptions): NolRasterSourceComponent | null  {
  return inject(NolRasterSourceComponent, options || {}) || null;
}

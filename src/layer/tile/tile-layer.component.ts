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
import { Extent } from 'ol/extent';
import { Options } from 'ol/layer/BaseTile';
import Map from 'ol/Map';
import BaseEvent from 'ol/events/Event';
import TileLayer from 'ol/layer/Tile';
import RenderEvent from 'ol/render/Event';
import TileSource from 'ol/source/Tile';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * For layer sources that provide pre-rendered, tiled images in grids that are 
 * organized by zoom levels for specific resolutions. 
 * @name nol-tile-layer
 * @order 1
 */
@Component({
  selector: 'nol-tile-layer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTileLayerComponent implements NolPrefixedOptions<Options<TileSource>>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolOpacity?: number;
  @Input() nolVisible?: boolean;
  @Input() nolExtent?: Extent;
  @Input() nolZIndex?: number;
  @Input() nolMinResolution?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolPreload?: number;
  @Input() nolSource?: TileSource;
  @Input() nolMap?: Map;
  @Input() nolUseInterimTilesOnError?: boolean;
  @Input() nolProperties?: Record<string, unknown>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolExtentChange = new EventEmitter<Extent>();
  @Output() nolMaxResolutionChange = new EventEmitter<number>();
  @Output() nolMaxZoomChange = new EventEmitter<number>();
  @Output() nolMinResolutionChange = new EventEmitter<number>();
  @Output() nolMinZoomChange = new EventEmitter<number>();
  @Output() nolOpacityChange = new EventEmitter<number>();
  @Output() nolPreloadChange = new EventEmitter<number>();
  @Output() nolSourceChange = new EventEmitter<TileSource>();
  @Output() nolUseInterimTilesOnErrorChange = new EventEmitter<boolean>();
  @Output() nolVisibleChange = new EventEmitter<boolean>();
  @Output() nolZIndexChange = new EventEmitter<number>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPostrender = new EventEmitter<RenderEvent>();
  @Output() nolPrerender = new EventEmitter<RenderEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolSourceready = new EventEmitter<BaseEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: TileLayer<TileSource>;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new TileLayer({
      className: this.nolClassName,
      opacity: this.nolOpacity,
      visible: this.nolVisible,
      extent: this.nolExtent,
      zIndex: this.nolZIndex,
      minResolution: this.nolMinResolution,
      maxResolution: this.nolMaxResolution,
      minZoom: this.nolMinZoom,
      maxZoom: this.nolMaxZoom,
      preload: this.nolPreload,
      source: this.nolSource,
      map: this.nolMap,
      useInterimTilesOnError: this.nolUseInterimTilesOnError,
      properties: this.nolProperties,
    });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:extent')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolExtent = this.instance.getExtent();
        this.nolExtentChange.emit(this.nolExtent);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:maxResolution')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolMaxResolution = this.instance.getMaxResolution();
        this.nolMaxResolutionChange.emit(this.nolMaxResolution);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:maxZoom')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolMaxZoom = this.instance.getMaxZoom();
        this.nolMaxZoomChange.emit(this.nolMaxZoom);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:minResolution')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolMinResolution = this.instance.getMinResolution();
        this.nolMinResolutionChange.emit(this.nolMinResolution);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:minZoom')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolMinZoom = this.instance.getMinZoom();
        this.nolMinZoomChange.emit(this.nolMinZoom);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:opacity')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolOpacity = this.instance.getOpacity();
        this.nolOpacityChange.emit(this.nolOpacity);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:preload')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolPreload = this.instance.getPreload();
        this.nolPreloadChange.emit(this.nolPreload);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:source')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolSource = this.instance.getSource() as TileSource;
        this.nolSourceChange.emit(this.nolSource);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:useInterimTilesOnError')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolUseInterimTilesOnError = this.instance.getUseInterimTilesOnError();
        this.nolUseInterimTilesOnErrorChange.emit(this.nolUseInterimTilesOnError);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:visible')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolVisible = this.instance.getVisible();
        this.nolVisibleChange.emit(this.nolVisible);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:zIndex')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolZIndex = this.instance.getZIndex();
        this.nolZIndexChange.emit(this.nolZIndex);
        this.cdr.markForCheck();
      });

    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'postrender')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPostrender.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'prerender')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPrerender.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    fromEvent<BaseEvent>(this.instance, 'sourceready')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolSourceready.emit(evt);
      });


    this.host.getInstance().addLayer(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolExtent,
      nolMap,
      nolMaxResolution,
      nolMaxZoom,
      nolMinResolution,
      nolMinZoom,
      nolOpacity,
      nolPreload,
      nolProperties,
      nolSource,
      nolUseInterimTilesOnError,
      nolVisible,
      nolZIndex
    } = changes;

    if (nolExtent) {
      this.instance.setExtent(nolExtent.currentValue);
    }

    if (nolMap) {
      this.instance.setMap(nolMap.currentValue);
    }

    if (nolMaxResolution) {
      this.instance.setMaxResolution(nolMaxResolution.currentValue);
    }

    if (nolMaxZoom) {
      this.instance.setMaxZoom(nolMaxZoom.currentValue);
    }

    if (nolMinResolution) {
      this.instance.setMinResolution(nolMinResolution.currentValue);
    }

    if (nolMinZoom) {
      this.instance.setMinZoom(nolMinZoom.currentValue);
    }

    if (nolOpacity) {
      this.instance.setOpacity(nolOpacity.currentValue);
    }

    if (nolPreload) {
      this.instance.setPreload(nolPreload.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolSource) {
      this.instance.setSource(nolSource.currentValue);
    }

    if (nolUseInterimTilesOnError) {
      this.instance.setUseInterimTilesOnError(nolUseInterimTilesOnError.currentValue);
    }

    if (nolVisible) {
      this.instance.setVisible(nolVisible.currentValue);
    }

    if (nolZIndex) {
      this.instance.setZIndex(nolZIndex.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeLayer(this.instance);
  }

}

export function injectTileLayer(): NolTileLayerComponent;
export function injectTileLayer(options: InjectOptions & {optional?: false}): NolTileLayerComponent;
export function injectTileLayer(options: InjectOptions): NolTileLayerComponent | null;
export function injectTileLayer(options?: InjectOptions): NolTileLayerComponent | null  {
  return inject(NolTileLayerComponent, options || {}) || null;
}

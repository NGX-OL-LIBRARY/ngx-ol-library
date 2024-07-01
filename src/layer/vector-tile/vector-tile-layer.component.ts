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
import { Extent } from 'ol/extent';
import { Feature, Map } from 'ol';
import { Geometry } from 'ol/geom';
import { ObjectEvent } from 'ol/Object';
import { BackgroundColor } from 'ol/layer/Base';
import { OrderFunction } from 'ol/render';
import { StyleLike } from 'ol/style/Style';
import BaseEvent from 'ol/events/Event';
import RenderEvent from 'ol/render/Event';
import VectorTile from 'ol/source/VectorTile';
import VectorTileLayer, { 
  Options, 
  VectorTileRenderType 
} from 'ol/layer/VectorTile';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectLayerHost } from 'ngx-ol-library/layer/core';

/**
 * Layer component for vector tile data that is rendered client-side.
 * @name nol-vector-tile-layer
 * @order 1
 */
@Component({
  selector: 'nol-vector-tile-layer',
  exportAs: 'nolVectorTileLayer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorTileLayerComponent implements NolPrefixedOptions<Options<Feature<Geometry>>>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolOpacity?: number;
  @Input() nolVisible?: boolean;
  @Input() nolExtent?: Extent;
  @Input() nolZIndex?: number;
  @Input() nolMinResolution?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolRenderOrder?: OrderFunction;
  @Input() nolRenderBuffer?: number;
  @Input() nolRenderMode?: VectorTileRenderType;
  @Input() nolSource?: VectorTile<Feature<Geometry>>;
  @Input() nolMap?: Map;
  @Input() nolDeclutter?: boolean;
  @Input() nolStyle?: StyleLike | null;
  @Input() nolBackground?: BackgroundColor;
  @Input() nolUpdateWhileAnimating?: boolean;
  @Input() nolUpdateWhileInteracting?: boolean;
  @Input() nolPreload?: number;
  @Input() nolUseInterimTilesOnError?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolExtentChange = new EventEmitter<Extent>();
  @Output() nolMaxResolutionChange = new EventEmitter<number>();
  @Output() nolMaxZoomChange = new EventEmitter<number>();
  @Output() nolMinResolutionChange = new EventEmitter<number>();
  @Output() nolMinZoomChange = new EventEmitter<number>();
  @Output() nolOpacityChange = new EventEmitter<number>();
  @Output() nolPreloadChange = new EventEmitter<number>();
  @Output() nolSourceChange = new EventEmitter<VectorTile<Feature<Geometry>> | undefined>();
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
  private readonly host = injectLayerHost('nol-vector-tile-layer');
  private instance!: VectorTileLayer<Feature<Geometry>>;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new VectorTileLayer({
      className: this.nolClassName,
      opacity: this.nolOpacity,
      visible: this.nolVisible,
      extent: this.nolExtent,
      zIndex: this.nolZIndex,
      minResolution: this.nolMinResolution,
      maxResolution: this.nolMaxResolution,
      minZoom: this.nolMinZoom,
      maxZoom: this.nolMaxZoom,
      renderOrder: this.nolRenderOrder,
      renderBuffer: this.nolRenderBuffer,
      renderMode: this.nolRenderMode,
      source: this.nolSource,
      map: this.nolMap,
      declutter: this.nolDeclutter,
      style: this.nolStyle,
      background: this.nolBackground,
      updateWhileAnimating: this.nolUpdateWhileAnimating,
      updateWhileInteracting: this.nolUpdateWhileInteracting,
      preload: this.nolPreload,
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
        this.nolSource = this.instance.getSource() ?? undefined;
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

    this.host.addLayer(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolBackground,
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
      nolStyle,
      nolUseInterimTilesOnError,
      nolVisible,
      nolZIndex,
    } = changes;

    if (nolBackground) {
      this.instance.setBackground(nolBackground.currentValue);
    }

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

    if (nolStyle) {
      this.instance.setStyle(nolStyle.currentValue);
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
    this.host.removeLayer(this.instance);
  }

}

export function useVectorTileLayer(): NolVectorTileLayerComponent;
export function useVectorTileLayer(options: InjectOptions & {optional?: false}): NolVectorTileLayerComponent;
export function useVectorTileLayer(options: InjectOptions): NolVectorTileLayerComponent | null;
export function useVectorTileLayer(options?: InjectOptions): NolVectorTileLayerComponent | null  {
  return inject(NolVectorTileLayerComponent, options || {}) || null;
}


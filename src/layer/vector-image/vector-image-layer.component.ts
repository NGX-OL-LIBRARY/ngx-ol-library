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
import { Feature, Map } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Extent } from 'ol/extent';
import { Geometry } from 'ol/geom';
import { OrderFunction } from 'ol/render';
import { StyleLike } from 'ol/style/Style';
import { FlatStyleLike } from 'ol/style/flat';
import { BackgroundColor } from 'ol/layer/Base';
import BaseEvent from 'ol/events/Event';
import VectorImageLayer, { Options } from 'ol/layer/VectorImage';
import RenderEvent from 'ol/render/Event';
import VectorSource from 'ol/source/Vector';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectLayerHost } from 'ngx-ol-library/layer/core';

/**
 * Vector data is rendered client-side, to an image.
 * @name nol-vector-image-layer
 * @order 1
 */
@Component({
  selector: 'nol-vector-image-layer',
  exportAs: 'nolVectorImageLayer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolVectorImageLayerComponent 
  implements NolPrefixedOptions<Options<VectorSource<Feature<Geometry>>>>, OnInit, OnChanges, OnDestroy {

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
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolMap?: Map;
  @Input() nolDeclutter?: string | number | boolean;
  @Input() nolStyle?: StyleLike | FlatStyleLike | null;
  @Input() nolBackground?: BackgroundColor;
  @Input() nolImageRatio?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolExtentChange = new EventEmitter<Extent>();
  @Output() nolMaxResolutionChange = new EventEmitter<number>();
  @Output() nolMaxZoomChange = new EventEmitter<number>();
  @Output() nolMinResolutionChange = new EventEmitter<number>();
  @Output() nolMinZoomChange = new EventEmitter<number>();
  @Output() nolOpacityChange = new EventEmitter<number>();
  @Output() nolSourceChange = new EventEmitter<VectorSource<Feature<Geometry>>>();
  @Output() nolVisibleChange = new EventEmitter<boolean>();
  @Output() nolZIndexChange = new EventEmitter<number>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPostrender = new EventEmitter<RenderEvent>();
  @Output() nolPrerender = new EventEmitter<RenderEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolSourceready = new EventEmitter<BaseEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectLayerHost('nol-vector-image-layer');
  private instance!: VectorImageLayer<Feature<Geometry>>;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new VectorImageLayer({
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
      source: this.nolSource,
      map: this.nolMap,
      declutter: this.nolDeclutter,
      style: this.nolStyle,
      imageRatio: this.nolImageRatio,
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
      
    fromEvent<ObjectEvent>(this.instance, 'change:source')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolSource = this.instance.getSource() as VectorSource<Feature<Geometry>>;
        this.nolSourceChange.emit(this.nolSource);
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
      nolExtent,
      nolMap,
      nolMaxResolution,
      nolMaxZoom,
      nolMinResolution,
      nolMinZoom,
      nolOpacity,
      nolProperties,
      nolSource,
      nolStyle,
      nolVisible,
      nolZIndex,
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

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolSource) {
      this.instance.setSource(nolSource.currentValue);
    }

    if (nolStyle) {
      this.instance.setStyle(nolStyle.currentValue);
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

export function useVectorImageLayer(): NolVectorImageLayerComponent;
export function useVectorImageLayer(options: InjectOptions & {optional?: false}): NolVectorImageLayerComponent;
export function useVectorImageLayer(options: InjectOptions): NolVectorImageLayerComponent | null;
export function useVectorImageLayer(options?: InjectOptions): NolVectorImageLayerComponent | null  {
  return inject(NolVectorImageLayerComponent, options || {}) || null;
}

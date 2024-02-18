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
import { Feature } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Extent } from 'ol/extent';
import { Geometry } from 'ol/geom';
import BaseEvent from 'ol/events/Event';
import Heatmap, { Options } from 'ol/layer/Heatmap';
import RenderEvent from 'ol/render/Event';
import VectorSource from 'ol/source/Vector';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectLayerHost } from 'ngx-ol-library/layer/core';

/**
 * Layer component for rendering vector data as a heatmap. 
 * @name nol-heatmap-layer
 * @order 1
 */
@Component({
  selector: 'nol-heatmap-layer',
  exportAs: 'nolHeatmapLayer',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolHeatmapLayerComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolOpacity?: number;
  @Input() nolVisible?: boolean;
  @Input() nolExtent?: Extent;
  @Input() nolZIndex?: number;
  @Input() nolMinResolution?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolGradient?: string[];
  @Input() nolRadius?: number;
  @Input() nolBlur?: number;
  @Input() nolWeight?: string | ((feature: Feature<Geometry>) => number);
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolBlurChange = new EventEmitter<number>();
  @Output() nolExtentChange = new EventEmitter<Extent>();
  @Output() nolGradientChange = new EventEmitter<string[]>();
  @Output() nolMaxResolutionChange = new EventEmitter<number>();
  @Output() nolMaxZoomChange = new EventEmitter<number>();
  @Output() nolMinResolutionChange = new EventEmitter<number>();
  @Output() nolMinZoomChange = new EventEmitter<number>();
  @Output() nolOpacityChange = new EventEmitter<number>();
  @Output() nolRadiusChange = new EventEmitter<number>();
  @Output() nolSourceChange = new EventEmitter<VectorSource<Feature<Geometry>>>();
  @Output() nolVisibleChange = new EventEmitter<boolean>();
  @Output() nolZIndexChange = new EventEmitter<number>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPostcompose = new EventEmitter<RenderEvent>();
  @Output() nolPostrender = new EventEmitter<RenderEvent>();
  @Output() nolPrecompose = new EventEmitter<RenderEvent>();
  @Output() nolPrerender = new EventEmitter<RenderEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolRendercomplete = new EventEmitter<RenderEvent>();
  @Output() nolSourceready = new EventEmitter<BaseEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectLayerHost('nol-heatmap-layer');
  private instance!: Heatmap;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Heatmap({
      className: this.nolClassName,
      opacity: this.nolOpacity,
      visible: this.nolVisible,
      extent: this.nolExtent,
      zIndex: this.nolZIndex,
      minResolution: this.nolMinResolution,
      maxResolution: this.nolMaxResolution,
      minZoom: this.nolMinZoom,
      maxZoom: this.nolMaxZoom,
      gradient: this.nolGradient,
      radius: this.nolRadius,
      blur: this.nolBlur,
      weight: this.nolWeight,
      source: this.nolSource,
      properties: this.nolProperties,
    });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:blur')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolBlur = this.instance.getBlur();
        this.nolBlurChange.emit(this.nolBlur);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:extent')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolExtent = this.instance.getExtent();
        this.nolExtentChange.emit(this.nolExtent);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:gradient')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolGradient = this.instance.getGradient();
        this.nolGradientChange.emit(this.nolGradient);
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

    fromEvent<ObjectEvent>(this.instance, 'change:radius')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolRadius = this.instance.getRadius();
        this.nolRadiusChange.emit(this.nolRadius);
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

    fromEvent<RenderEvent>(this.instance, 'postcompose')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPostcompose.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'postrender')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPostrender.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'precompose')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPrecompose.emit(evt);
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

    fromEvent<RenderEvent>(this.instance, 'rendercomplete')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolRendercomplete.emit(evt);
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
      nolBlur,
      nolExtent,
      nolGradient,
      nolMap,
      nolMaxResolution,
      nolMaxZoom,
      nolMinResolution,
      nolMinZoom,
      nolOpacity,
      nolProperties,
      nolRadius,
      nolSource,
      nolStyle,
      nolVisible,
      nolZIndex,
    } = changes;

    if (nolBlur) {
      this.instance.setBlur(nolBlur.currentValue);
    }

    if (nolExtent) {
      this.instance.setExtent(nolExtent.currentValue);
    }

    if (nolGradient) {
      this.instance.setGradient(nolGradient.currentValue);
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

    if (nolRadius) {
      this.instance.setRadius(nolRadius.currentValue);
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

export function useHeatmapLayer(): NolHeatmapLayerComponent;
export function useHeatmapLayer(options: InjectOptions & {optional?: false}): NolHeatmapLayerComponent;
export function useHeatmapLayer(options: InjectOptions): NolHeatmapLayerComponent | null;
export function useHeatmapLayer(options?: InjectOptions): NolHeatmapLayerComponent | null  {
  return inject(NolHeatmapLayerComponent, options || {}) || null;
}
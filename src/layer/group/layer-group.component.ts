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
import { Collection } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Extent } from 'ol/extent';
import BaseEvent from 'ol/events/Event';
import BaseLayer from 'ol/layer/Base';
import LayerGroup, { Options } from 'ol/layer/Group';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';
import { useOverviewMapControl } from 'ngx-ol-library/control/overview-map';

function useLayerGroupHost() {
  const options: InjectOptions = { host: true, optional: true };
  const map = injectMap(options);
  const overviewMap = useOverviewMapControl(options);
  const layerGroup = injectLayerGroup({ ...options, skipSelf: true });

  let getInstance, addLayer, removeLayer;

  if (layerGroup) {
    getInstance = () => layerGroup.getInstance();
    addLayer = (layer: BaseLayer) => {
      const layers = layerGroup.getInstance().getLayers();
      return layers.push(layer);
    }
    removeLayer = (layer: BaseLayer) => {
      const layers = layerGroup.getInstance().getLayers();
      return layers.remove(layer);
    };
  } else if (overviewMap) {
    getInstance = () => overviewMap.getInstance();
    addLayer = (layer: BaseLayer) =>{
      return overviewMap.getInstance().getOverviewMap().addLayer(layer);
    }
    removeLayer = (layer: BaseLayer) => {
      return overviewMap.getInstance().getOverviewMap().removeLayer(layer);
    }
  } else if (map) {
    getInstance = () => map.getInstance();
    addLayer = (layer: BaseLayer) => map.getInstance().addLayer(layer);
    removeLayer = (layer: BaseLayer) => map.getInstance().removeLayer(layer);
  } else {
    throw new Error(
      '`nol-layer-group` component must be nested within `nol-map`' +
      ', `nol-overview-map-control` or `nol-layer-group` component.'
    );
  }

  return { getInstance, addLayer, removeLayer };
}

/**
 * A [Collection](https://openlayers.org/en/latest/apidoc/module-ol_Collection-Collection.html) of layers that are handled together.
 * @name nol-layer-group
 * @order 1
 */
@Component({
  selector: 'nol-layer-group',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLayerGroupComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolOpacity?: number;
  @Input() nolVisible?: boolean;
  @Input() nolExtent?: Extent;
  @Input() nolZIndex?: number;
  @Input() nolMinResolution?: number;
  @Input() nolMaxResolution?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolLayers?: BaseLayer[] | Collection<BaseLayer>;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolExtentChange = new EventEmitter<Extent>();
  @Output() nolLayersChange = new EventEmitter<BaseLayer[]>();
  @Output() nolMaxResolutionChange = new EventEmitter<number>();
  @Output() nolMaxZoomChange = new EventEmitter<number>();
  @Output() nolMinResolutionChange = new EventEmitter<number>();
  @Output() nolMinZoomChange = new EventEmitter<number>();
  @Output() nolOpacityChange = new EventEmitter<number>();
  @Output() nolVisibleChange = new EventEmitter<boolean>();
  @Output() nolZIndexChange = new EventEmitter<number>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useLayerGroupHost();
  private instance!: LayerGroup;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new LayerGroup({
      opacity: this.nolOpacity,
      visible: this.nolVisible,
      extent: this.nolExtent,
      zIndex: this.nolZIndex,
      minResolution: this.nolMinResolution,
      maxResolution: this.nolMaxResolution,
      minZoom: this.nolMinZoom,
      maxZoom: this.nolMaxZoom,
      layers: this.nolLayers,
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

    fromEvent<ObjectEvent>(this.instance, 'change:layers')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolLayers = this.instance.getLayersArray();
        this.nolLayersChange.emit(this.nolLayers);
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

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    this.host.addLayer(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolExtent,
      nolLayers,
      nolMaxResolution,
      nolMaxZoom,
      nolMinResolution,
      nolMinZoom,
      nolOpacity,
      nolProperties,
      nolVisible,
      nolZIndex,
    } = changes;

    if (nolExtent) {
      this.instance.setExtent(nolExtent.currentValue);
    }

    if (nolLayers) {
      this.instance.setLayers(nolLayers.currentValue);
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

export function injectLayerGroup(): NolLayerGroupComponent;
export function injectLayerGroup(options: InjectOptions & {optional?: false}): NolLayerGroupComponent;
export function injectLayerGroup(options: InjectOptions): NolLayerGroupComponent | null;
export function injectLayerGroup(options?: InjectOptions): NolLayerGroupComponent | null  {
  return inject(NolLayerGroupComponent, options || {}) || null;
}
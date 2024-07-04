import { 
  ChangeDetectionStrategy, 
  Component, 
  InjectOptions, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  inject
} from '@angular/core';
import { Geometry } from 'ol/geom';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import ImageStyle from 'ol/style/Image';
import Text from 'ol/style/Text';
import Style, { GeometryFunction, Options, RenderFunction } from 'ol/style/Style';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { injectFeature } from 'ngx-ol-library/feature';
import { useDrawInteraction } from 'ngx-ol-library/interaction/draw';
import { useModifyInteraction } from 'ngx-ol-library/interaction/modify';
import { useSelectInteraction } from 'ngx-ol-library/interaction/select';
import { useGraticuleLayer } from 'ngx-ol-library/layer/graticule';
import { useHeatmapLayer } from 'ngx-ol-library/layer/heatmap';
import { injectVectorLayer } from 'ngx-ol-library/layer/vector';
import { useVectorImageLayer } from 'ngx-ol-library/layer/vector-image';
import { useVectorTileLayer } from 'ngx-ol-library/layer/vector-tile';
import { useStyleCollection } from './style-collection.component';
import { UpdateHostStyleMode } from './types';

/**
 * Component for vector feature rendering styles.
 * @name nol-style
 * @order 1
 */
@Component({
  selector: 'nol-style',
  exportAs: 'nolStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolGeometry?: string | Geometry | GeometryFunction;
  @Input() nolFill?: Fill;
  @Input() nolImage?: ImageStyle;
  @Input() nolRenderer?: RenderFunction;
  @Input() nolHitDetectionRenderer?: RenderFunction;
  @Input() nolStroke?: Stroke;
  @Input() nolText?: Text;
  @Input() nolZIndex?: number;

  private readonly styleCollectionHost = useStyleCollection({ optional: true, host: true });
  private readonly featureHost = injectFeature({ optional: true, host: true });
  private readonly drawInteractionHost = useDrawInteraction({ optional: true, host: true });
  private readonly modifyInteractionHost = useModifyInteraction({ optional: true, host: true });
  private readonly selectInteractionHost = useSelectInteraction({ optional: true, host: true });
  private readonly graticuleLayerHost = useGraticuleLayer({ optional: true, host: true });
  private readonly heatmapLayerHost = useHeatmapLayer({ optional: true, host: true });
  private readonly vectorLayerHost = injectVectorLayer({ optional: true, host: true });
  private readonly vectorImageLayerHost = useVectorImageLayer({ optional: true, host: true });
  private readonly vectorTileLayerHost = useVectorTileLayer({ optional: true, host: true });

  private instance!: Style;

  get interactionHost() {
    return this.drawInteractionHost || this.modifyInteractionHost;
  }

  get layerHost() {
    return this.graticuleLayerHost ||
      this.heatmapLayerHost ||
      this.vectorLayerHost ||
      this.vectorImageLayerHost ||
      this.vectorTileLayerHost;
  } 

  getInstance() {
    return this.instance;
  }

  update(): void {
    this.updateHostStyle('update');
  }

  ngOnInit(): void {
    this.instance = new Style({
      geometry: this.nolGeometry,
      fill: this.nolFill,
      image: this.nolImage,
      renderer: this.nolRenderer,
      hitDetectionRenderer: this.nolHitDetectionRenderer,
      stroke: this.nolStroke,
      text: this.nolText,
      zIndex: this.nolZIndex,
    });

    this.updateHostStyle('init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const {
      nolGeometry,
      nolFill,
      nolImage,
      nolRenderer,
      nolHitDetectionRenderer,
      nolStroke,
      nolText,
      nolZIndex
    } = changes;

    if (nolGeometry) {
      this.instance.setGeometry(nolGeometry.currentValue);
    }

    if (nolFill) {
      this.instance.setFill(nolFill.currentValue);
    }

    if (nolImage) {
      this.instance.setImage(nolImage.currentValue);
    }

    if (nolRenderer) {
      this.instance.setRenderer(nolRenderer.currentValue);
    }

    if (nolHitDetectionRenderer) {
      this.instance.setHitDetectionRenderer(nolHitDetectionRenderer.currentValue);
    }

    if (nolStroke) {
      this.instance.setStroke(nolStroke.currentValue);
    }

    if (nolText) {
      this.instance.setText(nolText.currentValue);
    }

    if (nolZIndex) {
      this.instance.setZIndex(nolZIndex.currentValue);
    }

    this.update();
  }

  ngOnDestroy(): void {
    this.updateHostStyle('destroy');
  }

  private updateHostStyle(mode: UpdateHostStyleMode): void {
    if (this.styleCollectionHost) {
      this.updateStyleCollection(mode);
    } else {
      let style: Style | undefined = undefined;

      if (mode === 'init') {
        style = this.instance;
      } else if (mode === 'update') {
        style = this.instance = this.instance.clone();
      }

      if (this.featureHost) {
        this.featureHost.getInstance().setStyle(style);
      } else if (this.selectInteractionHost) {
        this.selectInteractionHost.getInstance()['style_'] = style;
        this.selectInteractionHost.getInstance()['values_'].style_ = style;
        this.selectInteractionHost.getInstance().changed();
      } else if (this.interactionHost) {
        this.interactionHost.getInstance().getOverlay().setStyle(style);
        this.interactionHost.getInstance().changed();
      } else if (this.layerHost) {
        this.layerHost.getInstance().setStyle(style);
      } else {
        throw new Error(
          '`nol-style` component must be nested within `nol-feature`, `nol-style-collection`' +
          '`nol-draw-interaction`, `nol-modify-interaction`, `nol-select-interaction`, ' +
          '`nol-graticule-layer`, `nol-heatmap-layer`, `nol-vector-layer`, `nol-vector-image-layer` or ' +
          '`nol-vector-tile-layer` component.'
        );
      }
    }
  }

  private updateStyleCollection(mode: UpdateHostStyleMode): void {
    if (!this.styleCollectionHost) {
      return;
    }

    if (mode === 'init') {
      this.styleCollectionHost.addStyle(this.instance);
    } else if (mode === 'destroy') {
      this.styleCollectionHost.removeStyle(this.instance);
    } else {
      const oldStyle = this.instance;
      const newStyle = this.instance.clone();

      this.styleCollectionHost.replaceStyle(oldStyle, newStyle);
      this.instance = newStyle;
    }
  }

}

export function useStyle(): NolStyleComponent;
export function useStyle(options: InjectOptions & {optional?: false}): NolStyleComponent;
export function useStyle(options: InjectOptions): NolStyleComponent | null;
export function useStyle(options?: InjectOptions): NolStyleComponent | null  {
  return inject(NolStyleComponent, options || {}) || null;
}

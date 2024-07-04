import { 
  ChangeDetectionStrategy, 
  Component, 
  DestroyRef, 
  InjectOptions, 
  Input, 
  OnInit, 
  inject 
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, startWith } from 'rxjs';
import { Collection } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Style } from 'ol/style';
import { injectFeature } from 'ngx-ol-library/feature';
import { useDrawInteraction } from 'ngx-ol-library/interaction/draw';
import { useModifyInteraction } from 'ngx-ol-library/interaction/modify';
import { useSelectInteraction } from 'ngx-ol-library/interaction/select';
import { useGraticuleLayer } from 'ngx-ol-library/layer/graticule';
import { useHeatmapLayer } from 'ngx-ol-library/layer/heatmap';
import { injectVectorLayer } from 'ngx-ol-library/layer/vector';
import { useVectorImageLayer } from 'ngx-ol-library/layer/vector-image';
import { useVectorTileLayer } from 'ngx-ol-library/layer/vector-tile';

/**
 * An collection of style for vector feature rendering styles.
 * @name nol-style-collection
 * @order 2
 */
@Component({
  selector: 'nol-style-collection',
  exportAs: 'nolStyleCollection',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStyleCollectionComponent implements OnInit {

  @Input() set nolStyles(styles: Style[]) {
    this.collection.clear();
    this.collection.extend(styles);
  }

  private readonly destroyRef = inject(DestroyRef);
  private readonly featureHost = injectFeature({ optional: true, host: true });
  private readonly drawInteractionHost = useDrawInteraction({ optional: true, host: true });
  private readonly modifyInteractionHost = useModifyInteraction({ optional: true, host: true });
  private readonly selectInteractionHost = useSelectInteraction({ optional: true, host: true });
  private readonly graticuleLayerHost = useGraticuleLayer({ optional: true, host: true });
  private readonly heatmapLayerHost = useHeatmapLayer({ optional: true, host: true });
  private readonly vectorLayerHost = injectVectorLayer({ optional: true, host: true });
  private readonly vectorImageLayerHost = useVectorImageLayer({ optional: true, host: true });
  private readonly vectorTileLayerHost = useVectorTileLayer({ optional: true, host: true });
  private readonly collection = new Collection<Style>();

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

  ngOnInit(): void {
    fromEvent<ObjectEvent>(this.collection, 'change:length')
      .pipe(
        startWith(null),
        debounceTime(10),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.updateHostStyle();
      });
  }

  addStyle(style: Style): void {
    this.collection.push(style);
  }

  removeStyle(style: Style): void {
    this.collection.remove(style);
  }

  replaceStyle(oldStyle: Style, newStyle: Style): void {
    this.removeStyle(oldStyle);
    this.addStyle(newStyle);
  }

  private updateHostStyle(): void {
    const style = this.collection.getArray();

    if (this.featureHost) {
      this.featureHost.getInstance().setStyle(style);
    } else if (this.selectInteractionHost) {
      this.selectInteractionHost.getInstance()['style_'] = style;
      this.selectInteractionHost.getInstance()['values_']['style_'] = style;
      this.selectInteractionHost.getInstance().changed();
    } else if (this.interactionHost) {
      this.interactionHost.getInstance().getOverlay().setStyle(style);
      this.interactionHost.getInstance().changed();
    } else if (this.layerHost) {
      this.layerHost.getInstance().setStyle(style);
    } else {
      throw new Error(
        '`nol-style-collection` component must be nested within `nol-feature`, ' +
        '`nol-draw-interaction`, `nol-modify-interaction`, `nol-select-interaction`, ' +
        '`nol-graticule-layer`, `nol-heatmap-layer`, `nol-vector-layer`, `nol-vector-image-layer` or ' +
        '`nol-vector-tile-layer` component.'
      );
    }
  }

}

export function useStyleCollection(): NolStyleCollectionComponent;
export function useStyleCollection(options: InjectOptions & {optional?: false}): NolStyleCollectionComponent;
export function useStyleCollection(options: InjectOptions): NolStyleCollectionComponent | null;
export function useStyleCollection(options?: InjectOptions): NolStyleCollectionComponent | null  {
  return inject(NolStyleCollectionComponent, options || {}) || null;
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceComponent, NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolDragBoxInteractionModule } from 'ngx-ol-library/interaction/drag-box';
import { NolSelectInteractionModule } from 'ngx-ol-library/interaction/select';
import Style, { StyleFunction } from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';
import { Collection, Feature, Map } from 'ol';
import { Geometry } from 'ol/geom';
import { platformModifierKeyOnly } from 'ol/events/condition';
import DragBox, { DragBoxEvent } from 'ol/interaction/DragBox';
import { getWidth } from 'ol/extent';
import { unByKey } from 'ol/Observable';

@Component({
  selector: 'nol-drag-box-interaction-box-selection-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolDragBoxInteractionModule,
    NolSelectInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view
        [nolCenter]="[0, 0]"
        [nolZoom]="2"
        [nolConstrainRotation]="16"
      />
      <nol-vector-layer [nolBackground]="'#1a2b39'" [nolStyle]="style">
        <nol-vector-source
          [nolUrl]="'https://openlayers.org/data/vector/ecoregions.json'"
          [nolFormat]="format"
        />
      </nol-vector-layer>
      <!-- a normal select interaction to handle click -->
      <nol-select-interaction
        [nolFeatures]="selectedFeatures"
        [nolStyle]="selectedStyle"
      />
      <!-- a DragBox interaction used to select features by drawing boxes -->
      <nol-drag-box-interaction
        [nolCondition]="dragBoxCondition"
        (nolBoxend)="onBoxEnd($event)"
        (nolBoxstart)="onBoxStart()"
      />
    </nol-map>
    <div class="selected-regions">
      <span>Selected regions: </span>
      <span>{{ selectedRegions }}</span>
    </div>
  `,
  styles: [`
    :host > .selected-regions {
      margin-top: 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragBoxInteractionBoxSelectionExampleComponent {

  @ViewChild(NolVectorSourceComponent) 
  private readonly vectorSource!: NolVectorSourceComponent;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly style: StyleFunction = (feature) => new Style({
    fill: new Fill({
      color: feature.get('COLOR_BIO') || '#eeeeee',
    }),
  });

  readonly selectedStyle: StyleFunction = (feature) => new Style({
    fill: new Fill({
      color: feature.get('COLOR_BIO') || '#eeeeee',
    }),
    stroke: new Stroke({
      color: 'rgba(255, 255, 255, 0.7)',
      width: 2,
    }),
  });

  readonly format = new GeoJSON();
  readonly selectedFeatures = new Collection<Feature<Geometry>>();
  readonly dragBoxCondition = platformModifierKeyOnly;

  selectedRegions: string = 'None';

  constructor() {
    const eventsKey = this.selectedFeatures.on(['add', 'remove'], () => {
      const names = this.selectedFeatures
        .getArray()
        .map((feature) => feature.get('ECO_NAME'));
      this.selectedRegions = names.length > 0 ? names.join(', ') : 'None';
      this.cdr.markForCheck();
    });
    this.destroyRef.onDestroy(() => {
      unByKey(eventsKey);
    });
  }

  onBoxEnd(event: DragBoxEvent): void {
    const dragBox = event.target as DragBox;
    const map = dragBox.getMap() as Map;
    const boxExtent = dragBox.getGeometry().getExtent();
    // if the extent crosses the antimeridian process each world separately
    const worldExtent = map.getView().getProjection().getExtent();
    const worldWidth = getWidth(worldExtent);
    const startWorld = Math.floor((boxExtent[0] - worldExtent[0]) / worldWidth);
    const endWorld = Math.floor((boxExtent[2] - worldExtent[0]) / worldWidth);

    for (let world = startWorld; world <= endWorld; ++world) {
      const left = Math.max(boxExtent[0] - world * worldWidth, worldExtent[0]);
      const right = Math.min(boxExtent[2] - world * worldWidth, worldExtent[2]);
      const extent = [left, boxExtent[1], right, boxExtent[3]];
  
      const boxFeatures = this.vectorSource.getInstance()
        .getFeaturesInExtent(extent)
        .filter(
          (feature) =>
            !this.selectedFeatures.getArray().includes(feature) &&
            feature.getGeometry()!.intersectsExtent(extent)
        );
  
      // features that intersect the box geometry are added to the
      // collection of selected features
  
      // if the view is not obliquely rotated the box geometry and
      // its extent are equalivalent so intersecting features can
      // be added directly to the collection
      const rotation = map.getView().getRotation();
      const oblique = rotation % (Math.PI / 2) !== 0;
  
      // when the view is obliquely rotated the box extent will
      // exceed its geometry so both the box and the candidate
      // feature geometries are rotated around a common anchor
      // to confirm that, with the box geometry aligned with its
      // extent, the geometries intersect
      if (oblique) {
        const anchor = [0, 0];
        const geometry = dragBox.getGeometry().clone();
        geometry.translate(-world * worldWidth, 0);
        geometry.rotate(-rotation, anchor);
        const extent = geometry.getExtent();
        boxFeatures.forEach((feature) => {
          const geometry = feature.getGeometry()!.clone();
          geometry.rotate(-rotation, anchor);
          if (geometry.intersectsExtent(extent)) {
            this.selectedFeatures.push(feature);
          }
        });
      } else {
        this.selectedFeatures.extend(boxFeatures);
      }
    }
  }

  onBoxStart(): void {
    this.selectedFeatures.clear();
  }

}

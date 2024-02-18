import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent, NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolClusterSourceModule } from 'ngx-ol-library/source/cluster';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolViewModule } from 'ngx-ol-library/view';
import Style, { StyleFunction } from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import Text from 'ol/style/Text';
import { Coordinate } from 'ol/coordinate';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { Feature, Map, MapBrowserEvent } from 'ol';
import { boundingExtent } from 'ol/extent';
import { Point } from 'ol/geom';

function createClusteredStyle(): StyleFunction {
  const styleCache: Record<number, Style> = {};
  return (feature) => {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  };
}

@Component({
  selector: 'nol-cluster-source-clustered-features-example',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzTypographyModule,
    NzSliderModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolOSMSourceModule,
    NolVectorSourceModule,
    NolClusterSourceModule,
    NolFeatureModule,
    NolPointGeometryModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolClick)="onClickMap($event)">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer [nolStyle]="clusteredStyle" #clusters>
        <nol-cluster-source 
          [nolDistance]="distance" 
          [nolMinDistance]="minDistance"
        >
          <nol-vector-source>
            @for (item of coordinates; track $index) {
              <nol-feature>
                <nol-point-geometry [nolCoordinates]="item" />
              </nol-feature>
            }
          </nol-vector-source>
        </nol-cluster-source>
      </nol-vector-layer>
    </nol-map>
    <div nz-form [nzLayout]="'vertical'">
      <nz-form-item>
        <nz-form-label>Cluster distance</nz-form-label>
        <nz-form-control
          nzExtra="The distance within which features will be clustered together."
        >
          <nz-slider 
            [nzMin]="0"
            [nzMax]="200"
            [nzStep]="1"
            [(ngModel)]="distance"
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Minimum distance</nz-form-label>
        <nz-form-control
          nzExtra="The minimum distance between clusters. Can't be larger than the configured distance."
        >
          <nz-slider 
            [nzMin]="0"
            [nzMax]="200"
            [nzStep]="1"
            [(ngModel)]="minDistance"
          />
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: `
    :host > div[nz-form] {
      margin-top: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolClusterSourceClusteredFeaturesExampleComponent {

  @ViewChild('clusters', { read: NolVectorLayerComponent })
  readonly clusters!: NolVectorLayerComponent;

  readonly clusteredStyle = createClusteredStyle();
  readonly coordinates: Coordinate[];

  public distance = 40;
  public minDistance = 20;

  constructor() {
    const count = 20000;
    const coordinates = new Array(count);
    const e = 4500000;

    for (let i = 0; i < count; ++i) {
      coordinates[i] = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
    }

    this.coordinates = coordinates;
  }

  async onClickMap(evt: MapBrowserEvent<PointerEvent>) {
    const map = evt.target as Map;
    const clickedFeatures = await this.clusters.getInstance().getFeatures(evt.pixel);
    if (clickedFeatures.length) {
      // Get clustered Coordinates
      const features = clickedFeatures[0].get('features') as Feature<Point>[];
      if (features.length > 1) {
        const extent = boundingExtent(
          features.map((r) => r.getGeometry()!.getCoordinates())
        );
        map.getView().fit(extent, {
          duration: 1000, 
          padding: [50, 50, 50, 50]
        });
      }
    }
  }
}
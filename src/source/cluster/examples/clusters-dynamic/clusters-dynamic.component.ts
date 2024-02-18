import { ChangeDetectionStrategy, Component, Renderer2, ViewChild, inject } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerComponent, NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolClusterSourceModule } from 'ngx-ol-library/source/cluster';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';
import { Feature, Map, MapBrowserEvent } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import { LineString, Point, Polygon, SimpleGeometry } from 'ol/geom';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style, { StyleFunction } from 'ol/style/Style';
import monotoneChainConvexHull from 'monotone-chain-convex-hull';
import Text from 'ol/style/Text';
import { Coordinate } from 'ol/coordinate';
import { FeatureLike } from 'ol/Feature';
import { createEmpty, extend, getHeight, getWidth } from 'ol/extent';

const circleDistanceMultiplier = 1;
const circleFootSeparation = 28;
const circleStartAngle = Math.PI / 2;

const convexHullFill = new Fill({
  color: 'rgba(255, 153, 0, 0.4)',
});
const convexHullStroke = new Stroke({
  color: 'rgba(204, 85, 0, 1)',
  width: 1.5,
});
const outerCircleFill = new Fill({
  color: 'rgba(255, 153, 102, 0.3)',
});
const innerCircleFill = new Fill({
  color: 'rgba(255, 165, 0, 0.7)',
});
const textFill = new Fill({
  color: '#fff',
});
const textStroke = new Stroke({
  color: 'rgba(0, 0, 0, 0.6)',
  width: 3,
});
const innerCircle = new CircleStyle({
  radius: 14,
  fill: innerCircleFill,
});
const outerCircle = new CircleStyle({
  radius: 20,
  fill: outerCircleFill,
});
const darkIcon = new Icon({
  src: 'https://openlayers.org/en/latest/examples/data/icons/emoticon-cool.svg',
});
const lightIcon = new Icon({
  src: 'https://openlayers.org/en/latest/examples/data/icons/emoticon-cool-outline.svg',
});

/**
 * Single feature style, users for clusters with 1 feature and cluster circles.
 * @param clusterMember A feature from a cluster.
 * @return An icon style for the cluster member's location.
 */
function clusterMemberStyle(clusterMember: Feature<SimpleGeometry>): Style {
  return new Style({
    geometry: clusterMember.getGeometry(),
    image: clusterMember.get('LEISTUNG') > 5 ? darkIcon : lightIcon,
  });
}

/**
 * From
 * https://github.com/Leaflet/Leaflet.markercluster/blob/31360f2/src/MarkerCluster.Spiderfier.js#L55-L72
 * Arranges points in a circle around the cluster center, with a line pointing from the center to
 * each point.
 * @param Number of cluster members.
 * @param clusterCenter Center coordinate of the cluster.
 * @param resolution Current view resolution.
 * @return An array of coordinates representing the cluster members.
 */
function generatePointsCircle(count: number, clusterCenter: Coordinate, resolution: number): Coordinate[] {
  const circumference =
    circleDistanceMultiplier * circleFootSeparation * (2 + count);
  let legLength = circumference / (Math.PI * 2); //radius from circumference
  const angleStep = (Math.PI * 2) / count;
  const res = [];
  let angle;

  legLength = Math.max(legLength, 35) * resolution; // Minimum distance to get outside the cluster icon.

  for (let i = 0; i < count; ++i) {
    // Clockwise, like spiral.
    angle = circleStartAngle + i * angleStep;
    res.push([
      clusterCenter[0] + legLength * Math.cos(angle),
      clusterCenter[1] + legLength * Math.sin(angle),
    ]);
  }

  return res;
}


@Component({
  selector: 'nol-cluster-source-clusters-dynamic-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolXYZSourceModule,
    NolVectorSourceModule,
    NolClusterSourceModule,
    NolProjModule,
  ],
  template: `
    <nol-map 
      [nolHeight]="'400px'" 
      (nolPointermove)="onPointerMove($event)"
      (nolClick)="onClickMap($event)"
    >
      <nol-view 
        [nolCenter]="[0, 0]"
        [nolZoom]="2"
        [nolMaxZoom]="19"
        [nolExtent]="[16.1793, 48.1124, 16.5559, 48.313] | transformExtent: 'EPSG:4326': 'EPSG:3857'"
        [nolShowFullExtent]="true"
      />
      <nol-tile-layer>
        <nol-xyz-source [nolAttributions]="rasterAttributions" [nolUrl]="rasterUrl" />
      </nol-tile-layer>
      <!-- Layer displaying the convex hull of the hovered cluster. -->
      <nol-vector-layer [nolStyle]="clusterHullStyle" #clusterHulls>
        <nol-cluster-source 
          #clusterSource
          [nolAttributions]="clusterAttributions" 
          [nolDistance]="35"
        >
          <nol-vector-source 
            [nolUrl]="'https://openlayers.org/en/latest/examples/data/geojson/photovoltaic.json'"
            [nolFormat]="format"
          />
        </nol-cluster-source>
      </nol-vector-layer>
      <!-- Layer displaying the clusters and individual features. -->
      <nol-vector-layer 
        #clusters
        [nolStyle]="clusterStyle" 
        [nolSource]="clusterSource.getInstance()"
      />
      <!-- Layer displaying the expanded view of overlapping cluster members. -->
      <nol-vector-layer
        #clusterCircles
        [nolStyle]="clusterCircleStyle" 
        [nolSource]="clusterSource.getInstance()"
      />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolClusterSourceClustersDynamicExampleComponent {

  @ViewChild('clusterHulls', { read: NolVectorLayerComponent })
  private readonly clusterHulls!: NolVectorLayerComponent;

  @ViewChild('clusters', { read: NolVectorLayerComponent })
  private readonly clusters!: NolVectorLayerComponent;

  @ViewChild('clusterCircles', { read: NolVectorLayerComponent })
  private readonly clusterCircles!: NolVectorLayerComponent;

  private readonly renderer = inject(Renderer2);

  readonly rasterAttributions = 'Base map: <a target="_blank" href="https://basemap.at/">basemap.at</a>';
  readonly rasterUrl = 'https://maps{1-4}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png';

  readonly clusterAttributions = 'Data: <a href="https://www.data.gv.at/auftritte/?organisation=stadt-wien">Stadt Wien</a>';
  readonly format = new GeoJSON();

  readonly clusterHullStyle: StyleFunction = (cluster) => {
    if (cluster !== this.hoverFeature) {
      return [];
    }
    const originalFeatures = cluster.get('features') as Feature<Point>[];
    const points = originalFeatures.map((feature) =>
      feature.getGeometry()!.getCoordinates() as [number, number]
    );
    return new Style({
      geometry: new Polygon([monotoneChainConvexHull(points)]),
      fill: convexHullFill,
      stroke: convexHullStroke,
    });
  };

  readonly clusterStyle: StyleFunction = (feature) => {
    const size = feature.get('features').length;
    if (size > 1) {
      return [
        new Style({
          image: outerCircle,
        }),
        new Style({
          image: innerCircle,
          text: new Text({
            text: size.toString(),
            fill: textFill,
            stroke: textStroke,
          }),
        }),
      ];
    }
    const originalFeature = feature.get('features')[0];
    return clusterMemberStyle(originalFeature);
  };

  readonly clusterCircleStyle: StyleFunction = (cluster, resolution) => {
    if (cluster !== this.clickFeature || resolution !== this.clickResolution) {
      return [];
    }
    const clusterMembers = cluster.get('features');
    const geometry = cluster.getGeometry() as Point;
    const centerCoordinates = geometry.getCoordinates();
    return generatePointsCircle(
      clusterMembers.length,
      centerCoordinates,
      resolution
    ).reduce((styles, coordinates, i) => {
      const point = new Point(coordinates);
      const line = new LineString([centerCoordinates, coordinates]);
      styles.unshift(
        new Style({
          geometry: line,
          stroke: convexHullStroke,
        })
      );
      styles.push(
        clusterMemberStyle(
          new Feature({
            ...clusterMembers[i].getProperties(),
            geometry: point,
          })
        )
      );
      return styles;
    }, [] as Style[]);
  };

  public hoverFeature?: FeatureLike;
  public clickFeature?: FeatureLike;
  public clickResolution?: number;

  async onPointerMove(evt: MapBrowserEvent<PointerEvent>) {
    const map = evt.target as Map;
    const clusterHulls = this.clusterHulls.getInstance();
    const clusters = this.clusters.getInstance();
    const features = await clusters.getFeatures(evt.pixel);
    if (features[0] !== this.hoverFeature) {
      // Display the convex hull on hover.
      this.hoverFeature = features[0];
      clusterHulls.setStyle(this.clusterHullStyle);
      // Change the cursor style to indicate that the cluster is clickable.
      this.renderer.setStyle(
        map.getTargetElement(),
        'cursor',
        this.hoverFeature && this.hoverFeature.get('features').length > 1
          ? 'pointer'
          : ''
      );
    }
  }

  async onClickMap(evt: MapBrowserEvent<PointerEvent>) {
    const map = evt.target as Map;
    const clusters = this.clusters.getInstance();
    const clusterCircles = this.clusterCircles.getInstance();
    const features = await clusters.getFeatures(evt.pixel);
    const clusterMembers = features[0].get('features') as Feature<SimpleGeometry>[];
    if (clusterMembers.length > 1) {
      // Calculate the extent of the cluster members.
      const extent = createEmpty();
      clusterMembers.forEach((feature) =>
        extend(extent, feature.getGeometry()!.getExtent())
      );
      const view = map.getView();
      const resolution = map.getView().getResolution() as number;
      if (
        view.getZoom() === view.getMaxZoom() ||
        (getWidth(extent) < resolution && getHeight(extent) < resolution)
      ) {
        // Show an expanded view of the cluster members.
        this.clickFeature = features[0];
        this.clickResolution = resolution;
        clusterCircles.setStyle(this.clusterCircleStyle);
      } else {
        // Zoom to the extent of the cluster members.
        view.fit(extent, {
          duration: 500, 
          padding: [50, 50, 50, 50]
        });
      }
    }
  }
}
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolOGCMapTileSourceModule } from 'ngx-ol-library/source/ogc-map-tile';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolPointerInteractionModule } from 'ngx-ol-library/interaction/pointer';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { NolPolygonGeometryModule } from 'ngx-ol-library/geom/polygon';
import { NolLineStringGeometryModule } from 'ngx-ol-library/geom/line-string';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Feature from 'ol/Feature';
import { Geometry } from 'ol/geom';

@Component({
  selector: 'nol-pointer-interaction-custom-interactions-examples',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolOGCMapTileSourceModule,
    NolVectorSourceModule,
    NolFeatureModule,
    NolPointGeometryModule,
    NolPolygonGeometryModule,
    NolLineStringGeometryModule,
    NolPointerInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-ogc-map-tile-source 
          [nolUrl]="'https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad'"
          [nolCrossOrigin]="''"
        />
      </nol-tile-layer>
      <nol-vector-layer
        [nolStyle]="{
          'icon-src': 'https://openlayers.org/en/latest/examples/data/icon.png',
          'icon-opacity': 0.95,
          'icon-anchor': [0.5, 46],
          'icon-anchor-x-units': 'fraction',
          'icon-anchor-y-units': 'pixels',
          'stroke-width': 3,
          'stroke-color': [255, 0, 0, 1],
          'fill-color': [0, 0, 255, 0.6],
        }"
      >
        <nol-vector-source>
          <nol-feature>
            <nol-point-geometry 
              [nolCoordinates]="[0, 0]" 
            />
          </nol-feature>
          <nol-feature>
            <nol-line-string-geometry
              [nolCoordinates]="[
                [-1e7, 1e6],
                [-1e6, 3e6],
              ]"
            />
          </nol-feature>
          <nol-feature>
            <nol-polygon-geometry
              [nolCoordinates]="[
                [
                  [-3e6, -1e6],
                  [-3e6, 1e6],
                  [-1e6, 1e6],
                  [-1e6, -1e6],
                  [-3e6, -1e6],
                ],
              ]"
            />
          </nol-feature>
        </nol-vector-source>
      </nol-vector-layer>
      <nol-pointer-interaction
        [nolHandleDownEvent]="handleDownEvent"
        [nolHandleDragEvent]="handleDragEvent" 
        [nolHandleMoveEvent]="handleMoveEvent"
        [nolHandleUpEvent]="handleUpEvent"
      />
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPointerInteractionCustomInteractionsExamplesComponent {

  coordinate?: Coordinate;
  cursor: string = 'pointer';
  feature?: Feature<Geometry>;
  previousCursor?: string;

  readonly handleDownEvent = this.handleDownEvent_.bind(this);
  readonly handleDragEvent = this.handleDragEvent_.bind(this);
  readonly handleMoveEvent = this.handleMoveEvent_.bind(this);
  readonly handleUpEvent = this.handleUpEvent_.bind(this);

  handleDownEvent_(evt: MapBrowserEvent<PointerEvent>): boolean {
    const map = evt.map;

    const feature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);
  
    if (feature) {
      this.coordinate = evt.coordinate;
      this.feature = feature as Feature<Geometry>;
    }
  
    return !!feature;
  }

  handleDragEvent_(evt: MapBrowserEvent<PointerEvent>): void {
    if (!this.coordinate) return;
    const deltaX = evt.coordinate[0] - this.coordinate[0];
    const deltaY = evt.coordinate[1] - this.coordinate[1];
  
    const geometry = this.feature?.getGeometry();
    geometry?.translate(deltaX, deltaY);
  
    this.coordinate = [
      evt.coordinate[0],
      evt.coordinate[1]
    ];
  }

  handleMoveEvent_(evt: MapBrowserEvent<PointerEvent>): void {
    if (this.cursor) {
      const map = evt.map;
      const feature = map.forEachFeatureAtPixel(evt.pixel, feature => feature);
      const element = evt.map.getTargetElement();

      if (feature) {
        if (element.style.cursor != this.cursor) {
          this.previousCursor = element.style.cursor;
          element.style.cursor = this.cursor;
        }
      } else if (this.previousCursor !== undefined) {
        element.style.cursor = this.previousCursor;
        this.previousCursor = undefined;
      }
    }
  }

  handleUpEvent_(): boolean {
    this.coordinate = undefined;
    this.feature = undefined;
    return false;
  }

}

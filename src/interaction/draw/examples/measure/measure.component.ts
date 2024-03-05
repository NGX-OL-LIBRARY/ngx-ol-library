import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolOverlayModule } from 'ngx-ol-library/overlay';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { StyleFunction } from 'ol/style/Style';
import { Geometry, LineString, Polygon } from 'ol/geom';
import { Feature, MapBrowserEvent } from 'ol';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DrawEvent } from 'ol/interaction/Draw';
import { EventsKey } from 'ol/events';
import { Coordinate } from 'ol/coordinate';
import {getArea, getLength} from 'ol/sphere';
import { unByKey } from 'ol/Observable';

interface Measurement {
  sketch: Feature<Geometry>;
  tooltipCoord: Coordinate;
  tooltipTitle: string;
}

@Component({
  selector: 'nol-draw-interaction-measure-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolOverlayModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolOSMSourceModule,
    NolDrawInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolPointermove)="onPointerMove($event)">
      <nol-view [nolCenter]="[-11000000, 4600000]" [nolZoom]="15" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer
        [nolStyle]="{
          'fill-color': 'rgba(255, 255, 255, 0.2)',
          'stroke-color': '#ffcc33',
          'stroke-width': 2,
          'circle-radius': 7,
          'circle-fill-color': '#ffcc33',
        }"
      >
        <nol-vector-source #vectorSource />
      </nol-vector-layer>

      @if (helpTooltipCoord) {
        <nol-overlay
          [nolOffset]="[15, 0]"
          [nolPosition]="helpTooltipCoord"
          [nolPositioning]="'center-left'"
        >
          <div class="tooltip tooltip-help">{{ helpTooltip }}</div>
        </nol-overlay>
      }

      @if(currentMeasurement) {
        <nol-overlay
          [nolOffset]="[0, -15]"
          [nolPosition]="currentMeasurement.tooltipCoord"
          [nolPositioning]="'bottom-center'"
          [nolStopEvent]="false"
          [nolInsertFirst]="false"
        >
          <div class="tooltip tooltip-measure">
            {{ currentMeasurement.tooltipTitle }}
          </div>
        </nol-overlay>
      }

      @for (item of measurements; track item.sketch) {
        <nol-overlay
          [nolOffset]="[0, -7]"
          [nolPosition]="item.tooltipCoord"
          [nolPositioning]="'bottom-center'"
          [nolStopEvent]="false"
          [nolInsertFirst]="false"
        >
          <div class="tooltip tooltip-static">
            {{ item.tooltipTitle }}
          </div>
        </nol-overlay>
      }

      @switch (measurementType) {
        @case ('area') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'Polygon'"
            [nolStyle]="style"
            (nolDrawend)="onDrawend()"
            (nolDrawstart)="onDrawstart($event)"
          />
        }
        @case ('length') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'LineString'"
            [nolStyle]="style"
            (nolDrawend)="onDrawend()"
            (nolDrawstart)="onDrawstart($event)"
          />
        }
      }
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Measurement type</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="measurementType">
          <nz-option nzValue="length" nzLabel="Length (LineString)" />
          <nz-option nzValue="area" nzLabel="Area (Polygon)" />
        </nz-select>
      </span>
    </nz-space>
  `,
  styles: [
    `
      :host {
        nz-space {
          margin-top: 16px;
        }

        nz-select {
          width: 180px;
        }

        .tooltip {
          position: relative;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          color: white;
          padding: 4px 8px;
          opacity: 0.7;
          white-space: nowrap;
          font-size: 12px;
          cursor: default;
          user-select: none;

          &-measure {
            opacity: 1;
            font-weight: bold;
          }

          &-static {
            background-color: #ffcc33;
            color: black;
            border: 1px solid white;
          }

          &-measure:before,
          &-static:before {
            border-top: 6px solid rgba(0, 0, 0, 0.5);
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;
            content: "";
            position: absolute;
            bottom: -6px;
            margin-left: -7px;
            left: 50%;
          }

          &-static:before {
            border-top-color: #ffcc33;
          }
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionMeasureExampleComponent implements AfterViewInit {

  @ViewChild(NolMapComponent)
  private readonly map!: NolMapComponent;
  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly style: StyleFunction = (feature) => {
    const type = this.measurementType === 'area' ? 'Polygon' : 'LineString';
    const geometry = feature.getGeometry() as Geometry;
    const geometryType = geometry.getType();
    if (geometryType === type || geometryType === 'Point') {
      return new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      });
    }
    return;
  };

  measurementType: 'area' | 'length' = 'length';
  sketchChangeListener?: EventsKey;
  helpTooltip?: string;
  helpTooltipCoord?: Coordinate;
  measurements: Measurement[] = [];
  currentMeasurement?: Measurement;

  onPointerMove(evt: MapBrowserEvent<PointerEvent>): void {
    if (evt.dragging) {
      return;
    }

    let helpMsg = 'Click to start drawing';

    if (this.currentMeasurement) {
      const geom = this.currentMeasurement.sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = 'Click to continue drawing the polygon';
      } else if (geom instanceof LineString) {
        helpMsg = 'Click to continue drawing the line';
      }
    }

    this.helpTooltip = helpMsg;
    this.helpTooltipCoord = evt.coordinate;
  }

  onDrawstart(evt: DrawEvent): void {
    const sketch = evt.feature;
    const sketchGeometry = sketch.getGeometry() as Geometry;

    this.sketchChangeListener = sketchGeometry.on('change', (evt) => {
      const geom = evt.target;
      if (geom instanceof Polygon) {
        this.currentMeasurement = {
          sketch,
          tooltipCoord: geom.getInteriorPoint().getCoordinates(),
          tooltipTitle: this.formatArea(geom)
        };
      } else if (geom instanceof LineString) {
        this.currentMeasurement = {
          sketch,
          tooltipCoord: geom.getLastCoordinate(),
          tooltipTitle: this.formatLength(geom)
        };
      }
    });
  }

  onDrawend(): void {
    if (this.currentMeasurement) {
      this.measurements = [
        ...this.measurements, 
        this.currentMeasurement
      ];
    }
    this.currentMeasurement = undefined;
    if (this.sketchChangeListener) {
      unByKey(this.sketchChangeListener);
    }
  }

  ngAfterViewInit(): void {
    fromEvent(this.map.getInstance().getViewport(), 'mouseout')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.helpTooltip = undefined;
        this.helpTooltipCoord = undefined;
        this.cdr.markForCheck();
      });
  }

  private formatLength(line: LineString): string {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  }

  private formatArea(polygon: Polygon): string {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'k㎡';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + '㎡';
    }
    return output;
  }

}

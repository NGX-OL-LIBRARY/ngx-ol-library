import { NgFor, NgSwitch, NgSwitchCase } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NolFeatureModule } from 'ngx-ol-library/feature';
import { NolPointGeometryModule } from 'ngx-ol-library/geom/point';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolFillStyleModule } from 'ngx-ol-library/style/fill';
import { NolRegularShapeStyleModule } from 'ngx-ol-library/style/regular-shape';
import { NolStrokeStyleModule } from 'ngx-ol-library/style/stroke';
import { NolStyleModule } from 'ngx-ol-library/style/style';
import { NolViewModule } from 'ngx-ol-library/view';
import { Coordinate } from 'ol/coordinate';

interface IPoint {
  coordinates: Coordinate;
  styleKey: string,
}

@Component({
  selector: 'nol-regular-shape-style-regular-shapes-example',
  standalone: true,
  imports: [
    NgFor,
    NgSwitch,
    NgSwitchCase,
    NzButtonModule,
    NolMapModule,
    NolViewModule,
    NolFeatureModule,
    NolPointGeometryModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolStyleModule,
    NolStrokeStyleModule,
    NolFillStyleModule,
    NolRegularShapeStyleModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-vector-layer>
        <nol-vector-source>
          @for (point of points(); track $index) {
            <nol-feature>
              <nol-point-geometry [nolCoordinates]="point.coordinates" />
              @switch (point.styleKey) {
                @case ('square') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="4"
                      [nolRadius]="10"
                      [nolAngle]="Math.PI / 4"
                    >
                      <nol-fill-style [nolColor]="squareFillColor()" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('rectangle') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="4"
                      [nolRadius]="10 / Math.SQRT2"
                      [nolRadius2]="10"
                      [nolAngle]="0"
                      [nolScale]="[1, 0.5]"
                    >
                      <nol-fill-style [nolColor]="'red'" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('triangle') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="3"
                      [nolRadius]="10"
                      [nolRotation]="Math.PI / 4"
                      [nolAngle]="0"
                    >
                      <nol-fill-style [nolColor]="'red'" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('star') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="5"
                      [nolRadius]="10"
                      [nolRadius2]="4"
                      [nolAngle]="0"
                    >
                      <nol-fill-style [nolColor]="'red'" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('cross') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="4"
                      [nolRadius]="10"
                      [nolRadius2]="0"
                      [nolAngle]="0"
                    >
                      <nol-fill-style [nolColor]="'red'" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('x') {
                  <nol-style>
                    <nol-regular-shape-style
                      [nolPoints]="4"
                      [nolRadius]="10"
                      [nolRadius2]="0"
                      [nolAngle]="Math.PI / 4"
                    >
                      <nol-fill-style [nolColor]="'red'" />
                      <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                    </nol-regular-shape-style>
                  </nol-style>
                }
                @case ('stacked') {
                  <nol-style-collection>
                    <nol-style>
                      <nol-regular-shape-style
                        [nolPoints]="4"
                        [nolRadius]="5"
                        [nolAngle]="Math.PI / 4"
                        [nolDisplacement]="[0, 10]"
                      >
                        <nol-fill-style [nolColor]="'red'" />
                        <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                      </nol-regular-shape-style>
                    </nol-style>
                    <nol-style>
                      <nol-regular-shape-style
                        [nolPoints]="4"
                        [nolRadius]="10"
                        [nolAngle]="Math.PI / 4"
                      >
                        <nol-fill-style [nolColor]="'red'" />
                        <nol-stroke-style [nolColor]="'black'" [nolWidth]="2" />
                      </nol-regular-shape-style>
                    </nol-style>
                  </nol-style-collection>
                }
              }
            </nol-feature>
          }
        </nol-vector-source>
      </nol-vector-layer>
    </nol-map>
    <button nz-button (click)="changeSquareStyleFillColor()">Change Square Colors</button>
  `,
  styles: `
    :host > button {
      margin-top: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRegularShapeStyleRegularShapesExampleComponent {

  readonly Math = Math;
  readonly points = signal<IPoint[]>([]);
  readonly currentColorIndex = signal(0);
  readonly squareFillColor = computed(() => {
    const index = this.currentColorIndex();
    const colors = ['red', 'blue', 'green', 'yellow', 'aqua'];
    return colors[index % colors.length];
  });

  constructor() {
    const styleKeys = [
      'x',
      'cross',
      'star',
      'triangle',
      'square',
      'rectangle',
      'stacked',
    ];
    const count = 250;
    const e = 4500000;
    const points: IPoint[] = [];

    for (let i = 0; i < count; ++i) {
      const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
      points.push({
        coordinates,
        styleKey: styleKeys[Math.floor(Math.random() * styleKeys.length)]
      });
    }

    this.points.set(points);
  }

  changeSquareStyleFillColor(): void {
    this.currentColorIndex.update(index => index + 1);
  }

}
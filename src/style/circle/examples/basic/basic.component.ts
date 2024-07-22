import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolCircleStyleModule } from 'ngx-ol-library/style/circle';
import { NolFillStyleModule } from 'ngx-ol-library/style/fill';
import { NolStrokeStyleModule } from 'ngx-ol-library/style/stroke';
import { NolStyleModule } from 'ngx-ol-library/style/style';
import { NolViewModule } from 'ngx-ol-library/view';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

@Component({
  selector: 'nol-circle-style-basic-example',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzSliderModule,
    NzColorPickerModule,
    NolMapModule,
    NolViewModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolStyleModule,
    NolCircleStyleModule,
    NolFillStyleModule,
    NolStrokeStyleModule
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-vector-layer>
        <nol-vector-source [nolFeatures]="features" />
        <nol-style>
          <nol-circle-style [nolRadius]="radius()">
            <nol-fill-style [nolColor]="[255, 255, 255, .5]" />
            <nol-stroke-style [nolWidth]="1" [nolColor]="strokeColor()" />
          </nol-circle-style>
        </nol-style>
      </nol-vector-layer>
    </nol-map>
    <div nz-form>
      <nz-form-item>
        <nz-form-label>Circle Radius</nz-form-label>
        <nz-form-control>
          <nz-slider 
            [nzMax]="24" 
            [nzMin]="0" 
            [ngModel]="radius()" 
            (ngModelChange)="radius.set($event)" 
          />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Stroke Color</nz-form-label>
        <nz-form-control>
          <nz-color-picker 
            [nzShowText]="true"
            [ngModel]="strokeColor()" 
            (ngModelChange)="strokeColor.set($event)" 
          />
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: `
    :host > div[nz-form] {
      margin-top: 16px;
    }

    :host nz-slider {
      max-width: 240px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCircleStyleBasicExampleComponent {

  readonly features: Feature<Point>[];
  radius = signal(8);
  strokeColor = signal('#ff4d4f');

  constructor() {
    const count = 250;
    const features: Feature<Point>[] = [];
    const e = 4500000;
    for (let i = 0; i < count; ++i) {
      const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
      features.push(
        new Feature(new Point(coordinates))
      );
    }

    this.features = features;
  }

}
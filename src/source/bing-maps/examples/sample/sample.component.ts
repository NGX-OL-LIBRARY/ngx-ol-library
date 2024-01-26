import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolBingMapsSourceModule } from 'ngx-ol-library/source/bing-maps';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-bing-maps-source-sample-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolBingMapsSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view
        [nolCenter]="[-6655.5402445057125, 6709968.258934638]"
        [nolZoom]="13"
      />
      @for (item of styles; track item.value) {
        <nol-tile-layer
          [nolVisible]="item.value === selectedStyle"
          [nolPreload]="preload"
        >
          <nol-bing-maps-source 
            [nolKey]="bingMapsKey"
            [nolImagerySet]="item.value"
          />
        </nol-tile-layer>
      }
    </nol-map>
    <nz-select [(ngModel)]="selectedStyle">
      @for (style of styles; track $index) {
        <nz-option [nzLabel]="style.label" [nzValue]="style.value" />
      }
    </nz-select>
  `,
  styles: `
    :host > nz-select {
      margin-top: 16px;
      width: 160px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolBingMapsSourceSampleExampleComponent {
  // Your Bing Maps Key from https://www.bingmapsportal.com/ here
  readonly bingMapsKey = 'ApnZqi0Y-RQjo6Kv-Gmoz517qAzexzpOcBcZNY5yNUcuqNFdDnqyNzM_k5VtBinx';
  readonly styles = [
    { value: 'Aerial', label: 'Aerial' },
    { value: 'AerialWithLabelsOnDemand', label: 'Aerial with labels' },
    { value: 'RoadOnDemand', label: 'Road' },
    { value: 'CanvasDark', label: 'Road dark' },
    { value: 'OrdnanceSurvey', label: 'Ordnance Survey' },
  ];
  readonly preload = Infinity;

  public selectedStyle = 'AerialWithLabelsOnDemand';
}
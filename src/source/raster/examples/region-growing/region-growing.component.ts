import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolRasterSourceComponent, NolRasterSourceModule } from 'ngx-ol-library/source/raster';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Operation, RasterSourceEvent } from 'ol/source/Raster';

@Component({
  selector: 'nol-raster-source-region-growing-example',
  standalone: true,
  imports: [
    FormsModule,
    NzFormModule,
    NzSliderModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolImageLayerModule,
    NolTileLayerModule,
    NolRasterSourceModule,
    NolXYZSourceModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" (nolClick)="onClickMap($event)">
      <nol-view [nolCenter]="[-119.07, 47.65] | fromLonLat" [nolZoom]="11" />
      <nol-tile-layer #imagery>
        <nol-xyz-source 
          [nolAttributions]="attributions"
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolMaxZoom]="20"
          [nolCrossOrigin]="''"
        />
      </nol-tile-layer>
      <nol-image-layer [nolOpacity]="0.7">
        <nol-raster-source 
          [nolSources]="[imagery.getInstance().getSource()!]"
          [nolOperationType]="'image'"
          [nolOperation]="regionGrowOperation"
          [nolLib]="lib"
          (nolBeforeoperations)="onBeforeoperations($event)"
        />
      </nol-image-layer>
    </nol-map>
    <div nz-form>
      <nz-form-item>
        <nz-form-label nzFlex="0 0 80px">Threshold</nz-form-label>
        <nz-form-control>
          <nz-space>
            <span *nzSpaceItem>
              <nz-slider 
                [nzMin]="1"
                [nzMax]="50"
                [nzStep]="1"
                [ngModel]="threshold"
                (ngModelChange)="onThresholdValueChange($event)"
              />
            </span>
            <span *nzSpaceItem>{{ threshold }}</span>
          </nz-space>
        </nz-form-control>
      </nz-form-item>
    </div>
  `,
  styles: `
    :host > div[nz-form] {
      margin-top: 16px;

      nz-form-item {
        margin-bottom: 0;
      }

      nz-slider {
        display: block;
        width: 200px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolRasterSourceRegionGrowingExampleComponent {

  @ViewChild(NolMapComponent) map!: NolMapComponent;
  @ViewChild(NolRasterSourceComponent) rasterSource!: NolRasterSourceComponent;

  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  readonly regionGrowOperation = createRegionGrowOperation();
  readonly lib = { next4Edges };
  
  threshold = 20;

  private coordinate?: Coordinate;

  onClickMap(evt: MapBrowserEvent<PointerEvent>): void {
    this.coordinate = evt.coordinate;
    this.rasterSource.getInstance().changed();
  }

  onBeforeoperations(evt: RasterSourceEvent): void {
    // the event.data object will be passed to operations
    const data = evt.data;
    data.delta = this.threshold;
    if (this.coordinate) {
      data.pixel = this.map.getInstance().getPixelFromCoordinate(this.coordinate);
    }
  }

  onThresholdValueChange(threshold: number): void {
    this.threshold = threshold;
    this.rasterSource.getInstance().changed();
  }
}

function next4Edges(edge: number[]) {
  const x = edge[0];
  const y = edge[1];
  return [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
}

function createRegionGrowOperation(): Operation {
  return (inputs, data) => {
    const image = inputs[0] as ImageData;
    let seed = data.pixel;
    const delta = parseInt(data.delta);
    if (!seed) {
      return image;
    }

    seed = seed.map(Math.round);
    const width = image.width;
    const height = image.height;
    const inputData = image.data;
    const outputData = new Uint8ClampedArray(inputData);
    const seedIdx = (seed[1] * width + seed[0]) * 4;
    const seedR = inputData[seedIdx];
    const seedG = inputData[seedIdx + 1];
    const seedB = inputData[seedIdx + 2];
    let edge = [seed];
    while (edge.length) {
      const newedge = [];
      for (let i = 0, ii = edge.length; i < ii; i++) {
        // As noted in the Raster source constructor, this function is provided
        // using the `lib` option. Other functions will NOT be visible unless
        // provided using the `lib` option.
        const next = next4Edges(edge[i]);
        for (let j = 0, jj = next.length; j < jj; j++) {
          const s = next[j][0];
          const t = next[j][1];
          if (s >= 0 && s < width && t >= 0 && t < height) {
            const ci = (t * width + s) * 4;
            const cr = inputData[ci];
            const cg = inputData[ci + 1];
            const cb = inputData[ci + 2];
            const ca = inputData[ci + 3];
            // if alpha is zero, carry on
            if (ca === 0) {
              continue;
            }
            if (
              Math.abs(seedR - cr) < delta &&
              Math.abs(seedG - cg) < delta &&
              Math.abs(seedB - cb) < delta
            ) {
              outputData[ci] = 255;
              outputData[ci + 1] = 0;
              outputData[ci + 2] = 0;
              outputData[ci + 3] = 255;
              newedge.push([s, t]);
            }
            // mark as visited
            inputData[ci + 3] = 0;
          }
        }
      }
      edge = newedge;
    }
    return {
      data: outputData, 
      width: width, 
      height: height,
      colorSpace: 'display-p3'
    };
  };
}
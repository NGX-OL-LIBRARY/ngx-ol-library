import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolDataTileSourceModule } from 'ngx-ol-library/source/data-tile';
import { NolViewModule } from 'ngx-ol-library/view';
import { Loader } from 'ol/source/DataTile';

@Component({
  selector: 'nol-data-tile-source-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolDataTileSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="0" />
      <nol-webgl-tile-layer>
        <nol-data-tile-source [nolLoader]="loader" [nolTransition]="0" />
      </nol-webgl-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolDataTileSourceSampleExampleComponent {

  readonly loader: Loader;

  constructor() {
    const size = 256;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.strokeStyle = 'white';
    context.textAlign = 'center';
    context.font = '24px sans-serif';
    const lineHeight = 30;

    this.loader = (x, y, z) => {
      const half = size / 2;
      context.clearRect(0, 0, size, size);
      context.fillStyle = 'rgba(100, 100, 100, 0.5)';
      context.fillRect(0, 0, size, size);
      context.fillStyle = 'black';
      context.fillText(`z: ${z}`, half, half - lineHeight);
      context.fillText(`x: ${x}`, half, half);
      context.fillText(`y: ${y}`, half, half + lineHeight);
      context.strokeRect(0, 0, size, size);
      const data = context.getImageData(0, 0, size, size).data;
      // converting to Uint8Array for increased browser compatibility
      return new Uint8Array(data.buffer);
    };
  }
}
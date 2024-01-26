import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';
import { getRenderPixel } from 'ol/render';
import RenderEvent from 'ol/render/Event';
import { Size } from 'ol/size';

@Component({
  selector: 'nol-webgl-tile-layer-webgl-layer-swipe-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSliderModule,
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolOSMSourceModule,
    NolXYZSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-webgl-tile-layer>
        <nol-osm-source [nolWrapX]="true" />
      </nol-webgl-tile-layer>
      <nol-webgl-tile-layer
        (nolPrerender)="onPrerender($event)"
        (nolPostrender)="onPostrender($event)"
      >
        <nol-xyz-source
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolAttributions]="attributions"
          [nolMaxZoom]="20"
        />
      </nol-webgl-tile-layer>
    </nol-map>
    <nz-slider
      [nzMin]="0"
      [nzMax]="100"
      [nzStep]="1"
      [nzTooltipVisible]="'never'"
      [ngModel]="swipeValue"
      (ngModelChange)="onSwipeValueChange($event)"
    />
  `,
  styles: `
    :host > nz-slider {
      display: block;
      width: 100%;
      margin-top: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolWebGLTileLayerWebGLLayerSwipeExampleComponent {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;

  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions = 
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  public swipeValue = 50;

  onPrerender(evt: RenderEvent): void {
    const map = this.map.getInstance();
    const gl = evt.context as WebGL2RenderingContext;
    gl.enable(gl.SCISSOR_TEST);
  
    const mapSize = map.getSize() as Size; // [width, height] in CSS pixels
  
    // get render coordinates and dimensions given CSS coordinates
    const bottomLeft = getRenderPixel(evt, [0, mapSize[1]]);
    const topRight = getRenderPixel(evt, [mapSize[0], 0]);
  
    const width = Math.round((topRight[0] - bottomLeft[0]) * (this.swipeValue / 100));
    const height = topRight[1] - bottomLeft[1];
  
    gl.scissor(bottomLeft[0], bottomLeft[1], width, height);
  }

  onPostrender(evt: RenderEvent): void {
    const gl = evt.context as WebGLRenderingContext;
    gl.disable(gl.SCISSOR_TEST);
  }

  onSwipeValueChange(value: number): void {
    this.swipeValue = value;
    this.map.getInstance().render();
  }

}
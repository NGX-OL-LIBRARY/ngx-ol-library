import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolZoomifySourceComponent, NolZoomifySourceModule } from 'ngx-ol-library/source/zoomify';
import { NolViewModule } from 'ngx-ol-library/view';
import { View } from 'ol';
import TileGrid from 'ol/tilegrid/TileGrid';

@Component({
  selector: 'nol-zoomify-source-sample-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolZoomifySourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-tile-layer>
        @if (zoomifyProtocol === 'zoomify') {
          <nol-zoomify-source
            #zoomifySource
            [nolUrl]="zoomifyUrl"
            [nolSize]="[imgWidth, imgHeight]"
            [nolCrossOrigin]="'anonymous'"
            [nolZDirection]="-1"
          />
        } @else if (zoomifyProtocol === 'zoomifyretina') {
          <nol-zoomify-source
            [nolUrl]="zoomifyUrl"
            [nolSize]="[imgWidth, imgHeight]"
            [nolCrossOrigin]="'anonymous'"
            [nolZDirection]="-1"
            [nolTilePixelRatio]="retinaPixelRatio"
            [nolTileSize]="256 * retinaPixelRatio"
          />
        }
      </nol-tile-layer>
    </nol-map>
    <nz-select [(ngModel)]="zoomifyProtocol">
      <nz-option nzLabel="Zoomify" nzValue="zoomify" />
      <nz-option nzLabel="Zoomify Retina" nzValue="zoomifyretina" />
    </nz-select>
  `,
  styles: `
    :host > nz-select {
      margin-top: 16px;
      width: 180px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolZoomifySourceSampleExampleComponent implements AfterViewInit {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;
  @ViewChild('zoomifySource', { read: NolZoomifySourceComponent }) 
  readonly zoomifySource!: NolZoomifySourceComponent;

  readonly imgWidth = 4000;
  readonly imgHeight = 3000;
  readonly retinaPixelRatio = 2;
  readonly zoomifyUrl = 'https://ol-zoomify.surge.sh/zoomify/';

  public zoomifyProtocol: 'zoomify'|'zoomifyretina' = 'zoomify';

  ngAfterViewInit(): void {
    const source = this.zoomifySource.getInstance();
    const tileGrid = source.getTileGrid() as TileGrid;
    const view = new View({
      extent: tileGrid.getExtent(),
      resolutions: tileGrid.getResolutions(),
      constrainOnlyCenter: true,
    });
    this.map.getInstance().setView(view);
    this.map.getInstance().getView().fit(tileGrid.getExtent());
  }

}
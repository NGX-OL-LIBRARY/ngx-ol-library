import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolGeoTIFFSourceComponent, NolGeoTIFFSourceModule } from 'ngx-ol-library/source/geotiff';

@Component({
  selector: 'nol-geotiff-source-cog-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolWebGLTileLayerModule,
    NolGeoTIFFSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-webgl-tile-layer>
        <nol-geotiff-source 
          [nolSources]="[
            {
              url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif'
            }
          ]"
        />
      </nol-webgl-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGeoTIFFSourceCOGExampleComponent implements AfterViewInit {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;
  @ViewChild(NolGeoTIFFSourceComponent) readonly geotiffSource!: NolGeoTIFFSourceComponent;

  ngAfterViewInit(): void {
    const view = this.geotiffSource.getInstance().getView();
    this.map.getInstance().setView(view);
  }
}
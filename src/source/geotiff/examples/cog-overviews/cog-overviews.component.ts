import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolGeoTIFFSourceComponent, NolGeoTIFFSourceModule } from 'ngx-ol-library/source/geotiff';

@Component({
  selector: 'nol-geotiff-source-cog-overviews-example',
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
              url: 'https://openlayers.org/data/raster/no-overviews.tif',
              overviews: ['https://openlayers.org/data/raster/no-overviews.tif.ovr'],
            }
          ]"
        />
      </nol-webgl-tile-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGeoTIFFSourceCOGOverviewsExampleComponent implements AfterViewInit {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;
  @ViewChild(NolGeoTIFFSourceComponent) readonly geotiffSource!: NolGeoTIFFSourceComponent;

  ngAfterViewInit(): void {
    const view = this.geotiffSource.getInstance().getView();
    this.map.getInstance().setView(view);
  }
}
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolImageStaticSourceModule } from 'ngx-ol-library/source/image-static';
import { NolViewModule } from 'ngx-ol-library/view';
import { getCenter } from 'ol/extent';
import { Projection } from 'ol/proj';

@Component({
  selector: 'nol-image-static-source-sample-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolImageLayerModule,
    NolImageStaticSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view
        [nolProjection]="projection"
        [nolCenter]="center"
        [nolZoom]="2"
        [nolMaxZoom]="8"
      />
      <nol-image-layer>
        <nol-image-static-source
          [nolAttributions]="attributions"
          [nolUrl]="'https://imgs.xkcd.com/comics/online_communities.png'"
          [nolProjection]="projection"
          [nolImageExtent]="extent"
        />
      </nol-image-layer>
    </nol-map>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageStaticSourceSampleExampleComponent {

  attributions = '© <a href="https://xkcd.com/license.html">xkcd</a>';
  // Map views always need a projection.  Here we just want to map image
  // coordinates directly to map coordinates, so we create a projection that uses
  // the image extent in pixels.
  extent = [0, 0, 1024, 968];
  center = getCenter(this.extent);
  projection = new Projection({
    code: 'xkcd-image',
    units: 'pixels',
    extent: this.extent,
  });

}
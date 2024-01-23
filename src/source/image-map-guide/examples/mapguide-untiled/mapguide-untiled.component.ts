import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolImageMapGuideSourceModule } from 'ngx-ol-library/source/image-map-guide';
import { NolViewModule } from 'ngx-ol-library/view';
import { Extent } from 'ol/extent';

@Component({
  selector: 'nol-image-map-guide-source-mapguide-untiled-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolImageLayerModule,
    NolImageMapGuideSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view 
        [nolCenter]="[-87.7302542509315, 43.744459064634]" 
        [nolProjection]="'EPSG:4326'" 
        [nolZoom]="12" 
      />
      <nol-image-layer [nolExtent]="bounds">
        <nol-image-map-guide-source 
          [nolProjection]="'EPSG:4326'"
          [nolUrl]="agentUrl"
          [nolUseOverlay]="false"
          [nolMetersPerUnit]="111319.4908"
          [nolParams]="{
            MAPDEFINITION: mdf,
            FORMAT: 'PNG',
            VERSION: '3.0.0',
            USERNAME: 'OLGuest',
            PASSWORD: 'olguest',
          }"
          [nolRatio]="2"
        />
      </nol-image-layer>
    </nol-map>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageMapGuideSourceMapGuideUntiledExampleComponent {

  mdf = 'Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition';
  agentUrl = 'https://mikenunn.net/mapguide/mapagent/mapagent.fcgi?';
  bounds: Extent = [
    -87.865114442365922, 
    43.665065564837931, 
    -87.595394059497067,
    43.823852564430069,
  ];

}
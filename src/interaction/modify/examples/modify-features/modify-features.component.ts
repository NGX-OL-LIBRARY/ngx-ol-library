import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolSelectInteractionModule } from 'ngx-ol-library/interaction/select';
import { NolModifyInteractionModule } from 'ngx-ol-library/interaction/modify';
import { NolProjModule } from 'ngx-ol-library/proj';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'nol-modify-interaction-modify-features-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolSelectInteractionModule,
    NolModifyInteractionModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-100, 38.5] | fromLonLat" [nolZoom]="4" />
      <nol-vector-layer [nolBackground]="'white'">
        <nol-vector-source
          [nolUrl]="'https://openlayers.org/data/vector/us-states.json'"
          [nolFormat]="format"
          [nolWrapX]="false"
        />
      </nol-vector-layer>
      <nol-select-interaction #select />
      <nol-modify-interaction [nolFeatures]="select.getInstance().getFeatures()" />
    </nol-map>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolModifyInteractionModifyFeaturesExampleComponent {

  readonly format = new GeoJSON();

}

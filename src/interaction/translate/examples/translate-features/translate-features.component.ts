import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolSelectInteractionModule } from 'ngx-ol-library/interaction/select';
import { NolTranslateInteractionModule } from 'ngx-ol-library/interaction/translate';
import GeoJSON from 'ol/format/GeoJSON';

@Component({
  selector: 'nol-translate-interaction-translate-features-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolProjModule,
    NolSelectInteractionModule,
    NolTranslateInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-100, 38.5] | nolFromLonLat" [nolZoom]="4" />
      <nol-vector-layer [nolBackground]="'white'">
        <nol-vector-source 
          [nolUrl]="'https://openlayers.org/data/vector/us-states.json'"
          [nolFormat]="format"
        />
      </nol-vector-layer>
      <nol-select-interaction #select />
      <nol-translate-interaction [nolFeatures]="select.getInstance().getFeatures()" />
    </nol-map>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTranslateInteractionTranslateFeaturesExampleComponent {

  readonly format = new GeoJSON();

}

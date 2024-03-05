import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolExtentInteractionModule } from 'ngx-ol-library/interaction/extent';
import { shiftKeyOnly } from 'ol/events/condition';

@Component({
  selector: 'nol-extent-interaction-basic-example',
  standalone: true,
  imports: [
    CommonModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolExtentInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-extent-interaction [nolCondition]="condition" />
    </nol-map>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolExtentInteractionBasicExampleComponent {

  readonly condition = shiftKeyOnly;

}

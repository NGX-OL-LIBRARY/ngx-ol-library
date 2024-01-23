import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NolLayerGroupModule } from 'ngx-ol-library/layer/group';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolProjModule } from 'ngx-ol-library/proj';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolTileJSONSourceModule } from 'ngx-ol-library/source/tile-json';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-layer-group-sample-example',
  standalone: true,
  imports: [
    FormsModule,
    NzCheckboxModule,
    NzSliderModule,
    NzCollapseModule,
    NzFormModule,
    NolMapModule,
    NolViewModule,
    NolLayerGroupModule,
    NolTileLayerModule,
    NolOSMSourceModule,
    NolTileJSONSourceModule,
    NolProjModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[37.4057, 8.81566] | fromLonLat" [nolZoom]="4"></nol-view>
      <nol-tile-layer [nolVisible]="osmLayerVisible" [nolOpacity]="osmLayerOpacity">
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <nol-layer-group>
        <nol-tile-layer [nolVisible]="foodInsecurityLayerVisible" [nolOpacity]="foodInsecurityLayerOpacity">
          <nol-tile-json-source
            [nolUrl]="'https://api.tiles.mapbox.com/v4/mapbox.20110804-hoa-foodinsecurity-3month.json?secure&access_token=' + access_token"
            [nolCrossOrigin]="'anonymous'"
          ></nol-tile-json-source>
        </nol-tile-layer>
        <nol-tile-layer [nolVisible]="worldBordersLayerVisible" [nolOpacity]="worldBordersLayerOpacity">
          <nol-tile-json-source
            [nolUrl]="'https://api.tiles.mapbox.com/v4/mapbox.world-borders-light.json?secure&access_token=' + access_token"
            [nolCrossOrigin]="'anonymous'"
          ></nol-tile-json-source>
        </nol-tile-layer>
      </nol-layer-group>
    </nol-map>
    <nz-collapse nzGhost>
      <nz-collapse-panel nzHeader="OSM layer">
        <nz-form-item>
          <nz-form-label nzFlex="0 0 100px">Visible</nz-form-label>
          <nz-form-control>
            <span nz-checkbox [(ngModel)]="osmLayerVisible"></span>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label nzFlex="0 0 100px">Opacity</nz-form-label>
          <nz-form-control>
            <nz-slider [(ngModel)]="osmLayerOpacity" [nzMin]="0" [nzMax]="1" [nzStep]="0.01" />
          </nz-form-control>
        </nz-form-item>
      </nz-collapse-panel>
      <nz-collapse-panel nzHeader="Layer group">
        <nz-collapse nzGhost>
          <nz-collapse-panel nzHeader="Food insecurity layer">
            <nz-form-item>
              <nz-form-label nzFlex="0 0 100px">Visible</nz-form-label>
              <nz-form-control>
                <span nz-checkbox [(ngModel)]="foodInsecurityLayerVisible"></span>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label nzFlex="0 0 100px">Opacity</nz-form-label>
              <nz-form-control>
                <nz-slider [(ngModel)]="foodInsecurityLayerOpacity" [nzMin]="0" [nzMax]="1" [nzStep]="0.01" />
              </nz-form-control>
            </nz-form-item>
          </nz-collapse-panel>
          <nz-collapse-panel nzHeader="World borders layer">
            <nz-form-item>
              <nz-form-label nzFlex="0 0 100px">Visible</nz-form-label>
              <nz-form-control>
                <span nz-checkbox [(ngModel)]="worldBordersLayerVisible"></span>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label nzFlex="0 0 100px">Opacity</nz-form-label>
              <nz-form-control>
                <nz-slider [(ngModel)]="worldBordersLayerOpacity" [nzMin]="0" [nzMax]="1" [nzStep]="0.01" />
              </nz-form-control>
            </nz-form-item>
          </nz-collapse-panel>
        </nz-collapse>
      </nz-collapse-panel>
    </nz-collapse>
  `,
  styles: `
    :host > nz-collapse {
      margin-top: 16px;
    }

    :host nz-form-item {
      margin-bottom: 0;
    }

    :host nz-slider {
      display: block;
      width: 200px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLayerGroupSampleExampleComponent {

  osmLayerVisible = true;
  osmLayerOpacity = 1;
  foodInsecurityLayerVisible = true;
  foodInsecurityLayerOpacity = 1;
  worldBordersLayerVisible = true;
  worldBordersLayerOpacity = 1;

  readonly access_token = 'pk.eyJ1Ijoiam9ubnl0b3NoZW4iLCJhIjoiY2xpczVxYm5mMGJtNzNkb3pwYWJwZXBpdCJ9.BZ2X8v1_ubguMyiGOkEJcw';
}
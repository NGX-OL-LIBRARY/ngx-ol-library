import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import { NolModifyInteractionModule } from 'ngx-ol-library/interaction/modify';
import { NolSelectInteractionModule } from 'ngx-ol-library/interaction/select';
import { NolSnapInteractionModule } from 'ngx-ol-library/interaction/snap';
import Geometry, { Type as GeometryType } from 'ol/geom/Geometry';
import { Collection, Feature } from 'ol';

@Component({
  selector: 'nol-snap-interaction-basic-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzRadioModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolOSMSourceModule,
    NolDrawInteractionModule,
    NolModifyInteractionModule,
    NolSelectInteractionModule,
    NolSnapInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-11000000, 4600000]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer
        [nolStyle]="{
          'fill-color': 'rgba(255, 255, 255, 0.2)',
          'stroke-color': '#ffcc33',
          'stroke-width': 2,
          'circle-radius': 7,
          'circle-fill-color': '#ffcc33',
        }"
      >
        <nol-vector-source #vector />
      </nol-vector-layer>
      <nol-draw-interaction 
        [nolActive]="drawType === 'Point' && interaction === 'draw'"
        [nolType]="'Point'"
        [nolSource]="vector.getInstance()"
      />
      <nol-draw-interaction 
        [nolActive]="drawType === 'LineString' && interaction === 'draw'"
        [nolType]="'LineString'"
        [nolSource]="vector.getInstance()"
      />
      <nol-draw-interaction 
        [nolActive]="drawType === 'Polygon' && interaction === 'draw'"
        [nolType]="'Polygon'"
        [nolSource]="vector.getInstance()"
      />
      <nol-draw-interaction 
        [nolActive]="drawType === 'Circle' && interaction === 'draw'"
        [nolType]="'Circle'"
        [nolSource]="vector.getInstance()"
      />
      <nol-select-interaction 
        [nolActive]="interaction === 'modify'"
        [nolFeatures]="selectedFeatures" 
        (nolActiveChange)="clearSelectedFeatures()"
      />
      <nol-modify-interaction 
        [nolActive]="interaction === 'modify'"
        [nolFeatures]="selectedFeatures" 
      />
      <!-- 
        The snap interaction must be added after the Modify and Draw interactions
        in order for its map browser event handlers to be fired first. Its handlers
        are responsible of doing the snapping.
       -->
      <nol-snap-interaction [nolSource]="vector.getInstance()" />
    </nol-map>
    <nz-space [nzAlign]="'start'">
      <span *nzSpaceItem>
        <nz-radio-group [(ngModel)]="interaction">
          <span nz-radio nzValue="draw">Draw</span>
          <span nz-radio nzValue="modify">Modify</span>
        </nz-radio-group>
      </span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="drawType" [nzDisabled]="interaction !== 'draw'">
          <nz-option nzLabel="Point" nzValue="Point" />
          <nz-option nzLabel="LineString" nzValue="LineString" />
          <nz-option nzLabel="Polygon" nzValue="Polygon" />
          <nz-option nzLabel="Circle" nzValue="Circle" />
        </nz-select>
      </span>
    </nz-space>
  `,
  styles: [
    `
      :host > nz-space {
        margin-top: 16px;

        span[nz-radio] {
          display: block;
          height: 32px;
        }

        nz-select {
          width: 150px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSnapInteractionBasicExampleComponent {

  interaction: 'draw' | 'modify' = 'draw';
  drawType: GeometryType = 'Point';

  readonly selectedFeatures = new Collection<Feature<Geometry>>();

  clearSelectedFeatures(): void {
    this.selectedFeatures.forEach(each => {
      this.selectedFeatures.remove(each);
    });
  }

}

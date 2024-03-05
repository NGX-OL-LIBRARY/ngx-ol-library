import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDrawInteractionComponent, NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import { Type } from 'ol/geom/Geometry';

@Component({
  selector: 'nol-draw-interaction-draw-features-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSelectModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolOSMSourceModule,
    NolDrawInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-11000000, 4600000]" [nolZoom]="4" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-vector-layer>
        <nol-vector-source [nolWrapX]="false" #vectorSource />
      </nol-vector-layer>
      @for (type of listOfType; track $index) {
        @if (type !== 'None' && type === activeType) {
          <nol-draw-interaction 
            [nolSource]="vectorSource.getInstance()"
            [nolType]="type"
          />
        }
      }
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Geometry type:</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="activeType">
          @for (type of listOfType; track $index) {
            <nz-option [nzLabel]="type" [nzValue]="type" />
          }
        </nz-select>
      </span>
      <span *nzSpaceItem>
        <button 
          nz-button 
          [disabled]="activeType === 'None'" 
          (click)="undo()"
        >Undo</button>
      </span>
    </nz-space>
  `,
  styles: [
    `
      :host {
        nz-space {
          margin-top: 16px;
        }

        nz-select {
          width: 120px;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionDrawFeaturesExampleComponent {

  @ViewChild(NolDrawInteractionComponent)
  private readonly drawInteraction!: NolDrawInteractionComponent;

  listOfType: Array<Type | 'None'> = [
    'Point', 'LineString', 'Polygon', 'Circle', 'None'
  ];
  activeType: Type | 'None' = 'Point';

  undo(): void {
    if (this.drawInteraction) {
      this.drawInteraction.getInstance().removeLastPoint();
    }
  }

}

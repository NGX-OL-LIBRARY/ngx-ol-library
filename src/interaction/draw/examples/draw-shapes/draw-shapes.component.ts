import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolOSMSourceModule } from 'ngx-ol-library/source/osm';
import { NolDrawInteractionComponent, NolDrawInteractionModule } from 'ngx-ol-library/interaction/draw';
import { GeometryFunction, createBox, createRegularPolygon } from 'ol/interaction/Draw';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';

function createStar(): GeometryFunction {
  return (coordinates, geometry) => {
    const center = coordinates[0] as Coordinate;
    const last = coordinates[coordinates.length - 1] as Coordinate;
    const dx = center[0] - last[0];
    const dy = center[1] - last[1];
    const radius = Math.sqrt(dx * dx + dy * dy);
    const rotation = Math.atan2(dy, dx);
    const newCoordinates = [];
    const numPoints = 12;
  
    for (let i = 0; i < numPoints; ++i) {
      const angle = rotation + (i * 2 * Math.PI) / numPoints;
      const fraction = i % 2 === 0 ? 1 : 0.5;
      const offsetX = radius * fraction * Math.cos(angle);
      const offsetY = radius * fraction * Math.sin(angle);
      newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
    }
  
    newCoordinates.push(newCoordinates[0].slice());
  
    if (!geometry) {
      geometry = new Polygon([newCoordinates]);
    } else {
      geometry.setCoordinates([newCoordinates]);
    }
  
    return geometry;
  };
}

@Component({
  selector: 'nol-draw-interaction-draw-shapes-example',
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
      @switch (selectedShapeType) {
        @case ('Circle') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'Circle'"
          />
        }
        @case ('Square') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'Circle'"
            [nolGeometryFunction]="squareGeometryFunction"
          />
        }
        @case ('Box') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'Circle'"
            [nolGeometryFunction]="boxGeometryFunction"
          />
        }
        @case ('Star') {
          <nol-draw-interaction
            [nolSource]="vectorSource.getInstance()"
            [nolType]="'Circle'"
            [nolGeometryFunction]="starGeometryFunction"
          />
        }
      }
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Shape type:</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="selectedShapeType">
          @for (type of listOfShapeType; track $index) {
            <nz-option [nzLabel]="type" [nzValue]="type" />
          }
        </nz-select>
      </span>
      <span *nzSpaceItem>
        <button 
          nz-button 
          [disabled]="selectedShapeType === 'None'" 
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
export class NolDrawInteractionDrawShapesExampleComponent {

  @ViewChild(NolDrawInteractionComponent)
  private readonly drawInteraction!: NolDrawInteractionComponent;

  readonly squareGeometryFunction = createRegularPolygon(4);
  readonly boxGeometryFunction= createBox();
  readonly starGeometryFunction = createStar();
  readonly listOfShapeType = ['Circle', 'Square', 'Box', 'Star', 'None'];

  selectedShapeType = 'Circle';

  undo(): void {
    if (this.drawInteraction) {
      this.drawInteraction.getInstance().removeLastPoint();
    }
  }

}

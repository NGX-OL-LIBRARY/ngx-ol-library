import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolViewModule } from 'ngx-ol-library/view';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolVectorLayerModule } from 'ngx-ol-library/layer/vector';
import { NolVectorSourceModule } from 'ngx-ol-library/source/vector';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NolDragAndDropInteractionModule } from 'ngx-ol-library/interaction/drag-and-drop';
import FeatureFormat from 'ol/format/Feature';
import GPX from 'ol/format/GPX';
import GeoJSON from 'ol/format/GeoJSON';
import IGC from 'ol/format/IGC';
import KML from 'ol/format/KML';
import TopoJSON from 'ol/format/TopoJSON';
import { DragAndDropEvent } from 'ol/interaction/DragAndDrop';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'nol-drag-and-drop-interaction-basic-example',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFlexModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolVectorLayerModule,
    NolVectorSourceModule,
    NolXYZSourceModule,
    NolDragAndDropInteractionModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
      <nol-tile-layer>
        <nol-xyz-source 
          [nolAttributions]="attributions"
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolMaxZoom]="20"
        />
      </nol-tile-layer>

      @for (vectorData of inputVectorData; track vectorData.file) {
        <nol-vector-layer (nolSourceChange)="handleSourceChange($event)">
          <nol-vector-source [nolFeatures]="vectorData.features" />
        </nol-vector-layer>
      }

      <nol-drag-and-drop-interaction 
        [nolActive]="extractStyles"
        [nolFormatConstructors]="getFormatConstructors(true)"
        (nolAddfeatures)="handleAddFeaturesEvent($event)"
      />
      <nol-drag-and-drop-interaction 
        [nolActive]="!extractStyles"
        [nolFormatConstructors]="getFormatConstructors(false)"
        (nolAddfeatures)="handleAddFeaturesEvent($event)"
      />
    </nol-map>
    <nz-flex [nzVertical]="true" nzGap="large">
      <div>
        <span nz-checkbox [(nzChecked)]="extractStyles">Extract styles from KML</span>
      </div>
      <nz-flex nzAlign="center" nzGap="middle">
        <span>Download samples:</span>
        <button nz-button (click)="downloadSample('gpx/fells_loop.gpx')">GPX</button>
        <button nz-button (click)="downloadSample('geojson/roads-seoul.geojson')">GeoJSON</button>
        <button nz-button (click)="downloadSample('igc/Ulrich-Prinz.igc')">IGC</button>
        <button nz-button (click)="downloadSample('kml/states.kml')">KML</button>
        <button nz-button (click)="downloadSample('topojson/fr-departments.json')">TopoJSON</button>
      </nz-flex>
    </nz-flex>
  `,
  styles: [`
    :host > nz-flex {
      margin-top: 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragAndDropInteractionBasicExampleComponent {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;

  // Get your own API key at https://www.maptiler.com/cloud/
  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  extractStyles = true;
  inputVectorData: Array<{ 
    file: File, 
    features: Feature<Geometry>[] 
  }> = [];

  handleAddFeaturesEvent(event: DragAndDropEvent): void {
    const file = event.file;
    const features = event.features as Feature<Geometry>[];

    if (this.inputVectorData.find(item => item.file === file)) {
      return;
    }

    this.inputVectorData = [...this.inputVectorData, { file, features }];
  }

  handleSourceChange(source: VectorSource): void {
    this.map.getInstance().getView().fit(source.getExtent());
  }

  getFormatConstructors(extractStyles: boolean): (FeatureFormat | typeof FeatureFormat)[] {
    return [
      new GPX(),
      new GeoJSON(),
      new IGC(),
      // use constructed format to set options
      new KML({ extractStyles }),
      new TopoJSON(),
    ];
  }

  async downloadSample(path: string) {
    const filename = path.split('/').pop() as string;
    const response = await fetch('https://openlayers.org/en/latest/examples/data/' + path);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

}

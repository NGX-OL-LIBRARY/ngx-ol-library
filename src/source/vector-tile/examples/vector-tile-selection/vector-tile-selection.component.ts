import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolVectorTileLayerComponent, NolVectorTileLayerModule } from 'ngx-ol-library/layer/vector-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolVectorTileSourceModule } from 'ngx-ol-library/source/vector-tile';
import { NolViewModule } from 'ngx-ol-library/view';
import { MapBrowserEvent } from 'ol';
import { FeatureLike } from 'ol/Feature';
import MVT from 'ol/format/MVT';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style, { StyleFunction } from 'ol/style/Style';

const COUNTRY = new Style({
  stroke: new Stroke({
    color: 'gray',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(20,20,20,0.9)',
  }),
});

const SELECTED_COUNTRY = new Style({
  stroke: new Stroke({
    color: 'rgba(200,20,20,0.8)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(200,20,20,0.4)',
  }),
});

@Component({
  selector: 'nol-vector-tile-source-vector-tile-selection-example',
  standalone: true,
  imports: [
    FormsModule,
    NzSpaceModule,
    NzSelectModule,
    NolMapModule,
    NolViewModule,
    NolVectorTileLayerModule,
    NolVectorTileSourceModule,
  ],
  template: `
    <nol-map 
      [nolHeight]="'400px'" 
      (nolClick)="handleEvents($event)"
      (nolPointermove)="handleEvents($event)"
    >
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" [nolMultiWorld]="true" />
      <nol-vector-tile-layer 
        #vtLayer
        [nolDeclutter]="true" 
        [nolStyle]="country"
      >
        <nol-vector-tile-source 
          [nolMaxZoom]="15" 
          [nolFormat]="format" 
          [nolUrl]="url" 
        />
      </nol-vector-tile-layer>
      <nol-vector-tile-layer 
        #selectionLayer
        [nolRenderMode]="'vector'" 
        [nolSource]="vtLayer.getInstance().getSource()!"
        [nolStyle]="selectedCountry"
      />
    </nol-map>
    <nz-space nzAlign="center">
      <span *nzSpaceItem>Action type</span>
      <span *nzSpaceItem>
        <nz-select [(ngModel)]="actionType">
          <nz-option nzLabel="Single Select" nzValue="singleselect" />
          <nz-option nzLabel="Multi Select" nzValue="multiselect" />
          <nz-option nzLabel="Single Select on hover" nzValue="singleselect-hover" />
        </nz-select>
      </span>
    </nz-space>
  `,
  styles: `
    :host > nz-space {
      margin-top: 16px;

      nz-select {
        width: 200px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolVectorTileSourceVectorTileSelectionExampleComponent {

  @ViewChild('vtLayer', { read: NolVectorTileLayerComponent })
  private readonly vtLayer!: NolVectorTileLayerComponent;

  @ViewChild('selectionLayer', { read: NolVectorTileLayerComponent })
  private readonly selectionLayer!: NolVectorTileLayerComponent;

  readonly format = new MVT({ idProperty: 'iso_a3' });
  readonly url = 'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
    'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf';

  readonly country = COUNTRY;

  readonly selectedCountry: StyleFunction = (feature) => {
    if (this.selection.has(feature.getId() as string)) {
      return SELECTED_COUNTRY;
    }
    return undefined;
  };

  selection = new Map<string, FeatureLike>();
  actionType = 'singleselect';

  handleEvents(evt: MapBrowserEvent<PointerEvent>): void {
    if (
      (this.actionType === 'singleselect-hover' && evt.type !== 'pointermove') ||
      (this.actionType !== 'singleselect-hover' && evt.type === 'pointermove')
    ) {
      return;
    }

    const vtLayer = this.vtLayer.getInstance();
    const selectionLayer = this.selectionLayer.getInstance();

    vtLayer.getFeatures(evt.pixel).then((features) => {
      if (!features.length) {
        this.selection.clear();
        selectionLayer.changed();
        return;
      }
      const feature = features[0];
      if (!feature) {
        return;
      }
      const fid = feature.getId() as string;
  
      if (this.actionType.startsWith('singleselect')) {
        this.selection.clear();
      }
      // add selected feature to lookup
      this.selection.set(fid, feature);
  
      selectionLayer.changed();
    });
  }
}
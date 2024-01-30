import { ChangeDetectionStrategy, Component, Renderer2, ViewChild, inject } from '@angular/core';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOverlayModule } from 'ngx-ol-library/overlay';
import { NolTileJSONSourceModule } from 'ngx-ol-library/source/tile-json';
import { NolUTFGridSourceComponent, NolUTFGridSourceModule } from 'ngx-ol-library/source/utfgrid';
import { NolViewModule } from 'ngx-ol-library/view';
import { Map, MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';

interface UTFGridData {
  admin: string;
  flag_png: string;
}

@Component({
  selector: 'nol-utfgrid-source-utfgrid-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolTileJSONSourceModule,
    NolUTFGridSourceModule,
    NolOverlayModule,
  ],
  template: `
    <nol-map 
      [nolHeight]="'400px'" 
      (nolPointermove)="displayCountryInfo($event)"
      (nolClick)="displayCountryInfo($event)"
    >
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="1" />
      <nol-tile-layer>
        <nol-tile-json-source
          [nolUrl]="'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=' + access_token"
        />
      </nol-tile-layer>
      <nol-tile-layer>
        <nol-utfgrid-source
          [nolUrl]="'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=' + access_token"
        />
      </nol-tile-layer>
      <nol-overlay
        [nolPosition]="position"
        [nolOffset]="[15, 15]"
        [nolStopEvent]="false"
      >
        <div class="country-info">
          <div class="country-name">{{ data?.admin }}</div>
          <img class="country-flag" [src]="data?.flag_png" [alt]="data?.admin" />
        </div>
      </nol-overlay>
    </nol-map>
  `,
  styles: `
    :host .country-name {
      color: black;
      font-size: 12pt;
      font-weight: 500;
      text-shadow: white 0.1em 0.1em 0.2em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolUTFGridSourceUTFGridExampleComponent {

  @ViewChild(NolUTFGridSourceComponent) readonly utfgridSource!: NolUTFGridSourceComponent;

  private readonly renderer = inject(Renderer2);

  readonly access_token = 'pk.eyJ1Ijoiam9ubnl0b3NoZW4iLCJhIjoiY2xpczVxYm5mMGJtNzNkb3pwYWJwZXBpdCJ9.BZ2X8v1_ubguMyiGOkEJcw';

  public position?: Coordinate;
  public data?: UTFGridData;

  displayCountryInfo(evt: MapBrowserEvent<PointerEvent>): void {
    if (evt.dragging) {
      return;
    }

    const coordinate = evt.coordinate;
    const map = evt.target as Map;
    const mapElement = map.getViewport();
    const view = map.getView();
    const viewResolution = view.getResolution() as number;
    const gridSource = this.utfgridSource.getInstance();

    gridSource.forDataAtCoordinateAndResolution(
      coordinate, 
      viewResolution, (data: UTFGridData | null) => {
        // If you want to use the template from the TileJSON,
        // load the mustache.js library separately and call
        // this.data = Mustache.render(gridSource.getTemplate(), data);
        this.renderer.setStyle(mapElement, 'cursor', data ? 'pointer' : '');
        this.position = data ? coordinate : undefined;
        
        this.data = data 
          ? { 
            ...data, 
            flag_png: 'data:image/png;base64,' + data.flag_png 
          } 
          : undefined;
      }
    );

  }

}
import { Component, ViewEncapsulation } from "@angular/core";
import { NolMapComponent } from "ngx-ol-library/map";

@Component({
  selector: 'nol-accessible-map-example',
  template: `
    <nol-map #map [targetAttributes]="{ tabindex: 0 }" height="400px">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <div class="actions">
        <button type="button" (click)="zoomOut(map)">Zoom out</button>
        <button type="button" (click)="zoomIn(map)">Zoom in</button>
      </div>
    </nol-map>
  `,
  styles: [`
    nol-map > div[tabindex="0"]:focus {
      outline: #4A74A8 solid 0.15em;
    }

    div.actions {
      margin-top: 16px;
    }

    div.actions > button {
      padding: 8px 16px;
      margin-right: 8px;
      cursor: pointer;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class NolAccessibleMapExampleComponent {

  zoomOut(map: NolMapComponent): void {
    const view = map.instance.getView();
    const zoom = view.getZoom()!;
    view.setZoom(zoom - 1);
  }

  zoomIn(map: NolMapComponent): void {
    const view = map.instance.getView();
    const zoom = view.getZoom()!;
    view.setZoom(zoom + 1);
  }
}
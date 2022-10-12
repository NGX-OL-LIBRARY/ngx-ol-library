import { Component } from "@angular/core";
import { MapBrowserEvent } from "ol";
import { Coordinate } from "ol/coordinate";

@Component({
  selector: 'nol-popup-example',
  template: `
    <nol-map height="500px" (onSingleclick)="onSingleclickMap($event)">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-xyz-source [attributions]="attributions" [url]="url" [tileSize]="512"></nol-xyz-source>
      </nol-tile-layer>
      <!-- Create an overlay to anchor the popup to the map. -->
      <nol-overlay
        [autoPan]="{
          animation: {
            duration: 250
          }
        }"
        [position]="clickPosition"
      >
        <ng-container *nolOverlayContent>
          <div class="popup">
            <a class="popup-closer" (click)="closePopup()">✖</a>
            <div class="popup-content">
              <p>You clicked here:</p>
              <code *ngIf="clickPosition">{{ clickPosition | nolToStringHDMS }}</code>
            </div>
          </div>
        </ng-container>
      </nol-overlay>
    </nol-map>
  `,
  styles: [`
    .popup {
      position: absolute;
      background-color: white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #cccccc;
      bottom: 12px;
      left: -50px;
      min-width: 280px;
    }

    .popup:before,
    .popup:after {
      top: 100%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    .popup:before {
      border-top-color: #cccccc;
      border-width: 11px;
      left: 48px;
      margin-left: -11px;
    }

    .popup:after {
      border-top-color: white;
      border-width: 10px;
      left: 48px;
      margin-left: -10px;
    }

    .popup-closer {
      text-decoration: none;
      position: absolute;
      top: 2px;
      right: 8px;
      cursor: pointer;
    }

    .popup-content > p {
      margin-bottom: 1rem;
    }

    .popup-content > code {
      color: #333333;
      background-color: #F5F5F5;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: .875em;
    }
  `]
})
export class NolPopupExampleComponent {

  attributions = `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`;
  url = 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB';
  clickPosition?: Coordinate;

  onSingleclickMap(event: MapBrowserEvent<any>): void {
    this.clickPosition = event.coordinate;
  }

  closePopup(): void {
    this.clickPosition = undefined;
  }
}
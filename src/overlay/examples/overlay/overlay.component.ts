import { Component } from '@angular/core';
import { MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';

@Component({
  selector: 'nol-overlay-example',
  template:  `
    <nol-map height="500px" (onClick)="onClickMap($event)">
      <nol-view [center]='[0, 0]' [zoom]='2'></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <!-- Popup showing the position the user clicked -->
      <nol-overlay
        *ngIf="clickPosition"
        [position]="clickPosition"
        [positioning]="'bottom-center'"
      >
        <ng-container *nolOverlayContent>
          <div class="popover">
            <div class="popover-arrow"></div>
            <h3 class="popover-header">Welcome to OpenLayers</h3>
            <div class="popover-body">
              <p>The location you clicked was:</p>
              <code>{{ clickPosition | nolToStringHDMS }}</code>
            </div>
          </div>
        </ng-container>
      </nol-overlay>
      <!-- Vienna marker -->
      <nol-overlay
        [position]="[16.3725, 48.208889] | nolFromLonLat"
        positioning="center-center"
        [stopEvent]="false"
      >
        <ng-container *nolOverlayContent>
          <div class="vienna-marker"></div>
        </ng-container>
      </nol-overlay>
      <!-- Vienna label -->
      <nol-overlay [position]="[16.3725, 48.208889] | nolFromLonLat">
        <ng-container *nolOverlayContent>
          <a class="vienna-label" href="https://en.wikipedia.org/wiki/Vienna" target="_blank">Vienna</a>
        </ng-container>
      </nol-overlay>
    </nol-map>
  `,
  styles: [`
    .popover {
      position: relative;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.175);
      border-radius: 0.5rem;
      max-width: 276px;
      transform: translateY(-8px);
    }

    .popover-arrow {
      position: absolute;
      transform: translate(129px, 0px);
      left: 0px;
      bottom: calc(0.5rem * -1 - 1px);
      display: block;
      width: 1rem;
      height: 0.5rem;
      transform: translate(129px, 0px);
    }

    .popover-arrow::before,
    .popover-arrow::after {
      position: absolute;
      display: block;
      content: "";
      border-color: transparent;
      border-style: solid;
      border-width: 0.5rem calc(1rem * .5) 0;
    }

    .popover-arrow::before {
      bottom: 0;
      border-top-color: rgba(0, 0, 0, 0.175);
    }

    .popover-arrow::after {
      bottom: 1px;
      border-top-color: #fff;
    }


    .popover-header {
      padding: 0.5rem 1rem;
      margin: 0;
      font-size: 1rem;
      color: rgba(0, 0, 0, .85);
      background-color: #f0f0f0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.175);
      border-top-left-radius: calc(0.5rem - 1px);
      border-top-right-radius: calc(0.5rem - 1px);
    }

    .popover-body {
      min-width: 276px;
      padding: 1rem 1rem;
      color: #212529;
    }

    .popover-body > p {
      margin-bottom: 1rem;
    }

    .popover-body > code {
      color: #333333;
      background-color: #F5F5F5;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-size: .875em;
    }

    .vienna-marker {
      width: 20px;
      height: 20px;
      border: 1px solid #088;
      border-radius: 10px;
      background-color: #0FF;
      opacity: 0.5;
      box-sizing: border-box;
    }

    .vienna-label {
      text-decoration: none;
      color: white;
      font-size: 11pt;
      font-weight: bold;
      text-shadow: black 0.1em 0.1em 0.2em;
    }
  `]
})
export class NolOverlayExampleComponent {

  clickPosition?: Coordinate;

  onClickMap(event: MapBrowserEvent<any>): void {
    this.clickPosition = event.coordinate;
  }
}
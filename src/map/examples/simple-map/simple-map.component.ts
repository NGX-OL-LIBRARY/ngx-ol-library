import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'nol-simple-map-example',
  template: `
    <nol-map height="400px">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
    </nol-map>
  `,
})
export class NolSimpleMapExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
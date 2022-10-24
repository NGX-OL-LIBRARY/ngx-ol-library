import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'nol-map-graticule-example',
  template: `
    <nol-map height="500px">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <nol-graticule-layer [showLabels]="true"></nol-graticule-layer>
    </nol-map>
  `
})
export class NolMapGraticuleExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
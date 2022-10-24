import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'nol-bing-maps-example',
  template: `
    <select [(ngModel)]="selected">
      <option *ngFor="let style of styles" [value]="style.value">{{ style.label }}</option>
    </select>
    
    <nol-map height="500px">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <ng-container *ngFor="let style of styles">
        <nol-tile-layer [visible]="style.value === selected">
          <nol-bing-maps-source [key]="key" [imagerySet]="style.value"></nol-bing-maps-source>
        </nol-tile-layer>
      </ng-container>
    </nol-map>
  `
})
export class NolBingMapsExampleComponent implements OnInit {

  key = 'ApnZqi0Y-RQjo6Kv-Gmoz517qAzexzpOcBcZNY5yNUcuqNFdDnqyNzM_k5VtBinx';
  styles = [
    { value: 'RoadOnDemand', label: 'Road' },
    { value: 'Aerial', label: 'Aerial' },
    { value: 'AerialWithLabelsOnDemand', label: 'Aerial with labels' },
    { value: 'CanvasDark', label: 'Road dark' },
    { value: 'OrdnanceSurvey', label: 'Ordnance Survey' },
  ];
  selected = 'Aerial';

  constructor() { }

  ngOnInit(): void { }
}
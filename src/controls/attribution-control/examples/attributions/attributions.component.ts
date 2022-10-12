import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import { NolMapComponent } from 'ngx-ol-library/map';

@Component({
  selector: 'nol-attributions-example',
  template: `
    <nol-map [controls]='controls' height='400px'>
      <nol-view [center]='[0, 0]' [zoom]='2'></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
      <nol-attribution-control [collapsible]='collapsible' [collapsed]='collapsed'></nol-attribution-control>
    </nol-map>
  `
})
export class NolAttributionsExampleComponent implements AfterViewInit {

  controls = defaultControls({ attribution: false });
  collapsible = false;
  collapsed = true;

  @ViewChild(NolMapComponent) map: NolMapComponent | null = null;

  constructor(protected renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.listen('window', 'resize', (event: Event) => {
      if (this.map) {
        const size = this.map.instance.getSize();
        const width = size ? size[0] : (event.target as Window).innerHeight;
        this.collapsed = this.collapsible = width < 600;
      }
    });
  }

}
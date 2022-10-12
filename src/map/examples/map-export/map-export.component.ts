import { Component, OnInit } from "@angular/core";
import { NolMapComponent } from "ngx-ol-library/map";

@Component({
  selector: 'nol-map-export-example',
  template: `
    <button type="button" (click)="download(map)">Download PNG</button>
    <nol-map #map height="400px">
      <nol-view [center]="[0, 0]" [zoom]="2"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
    </nol-map>
  `,
})
export class NolMapExportExample implements OnInit {


  constructor() { }

  ngOnInit(): void { }

  download(map: NolMapComponent): void {
    map.instance.once('rendercomplete', () => {
      const canvasList = map.instance.getViewport().querySelectorAll<HTMLCanvasElement>('.ol-layer canvas, canvas.ol-layer');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const [width, height] = map.instance.getSize()!;
      canvas.width = width;
      canvas.height = height;
  
      canvasList.forEach(canvasElement => {
        if (canvasElement.width > 0) {
          const opacity = canvasElement.parentElement?.style.opacity || canvasElement.style.opacity;
          ctx.globalAlpha = opacity === '' ? 1 : Number(opacity);
          let matrix: any;
          const transform = canvasElement.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)![1]
              .split(',')
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvasElement.style.width) / canvasElement.width,
              0,
              0,
              parseFloat(canvasElement.style.height) / canvasElement.height,
              0,
              0,
            ];
          }
          // Apply the transform to the export map context
          ctx.setTransform(matrix);
          const backgroundColor = canvasElement.parentElement?.style.backgroundColor;
          if (backgroundColor) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
          }
          ctx.drawImage(canvasElement, 0, 0);
        }
      });
  
      ctx.globalAlpha = 1;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
  
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = canvas.toDataURL();
      link.download = 'map_export.png';
      link.click();
      link.remove();
    });
    map.instance.renderSync();
  }
}
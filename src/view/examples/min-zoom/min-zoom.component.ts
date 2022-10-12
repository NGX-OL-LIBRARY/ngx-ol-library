import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Component({
  selector: 'nol-min-zoom-example',
  template: `
    <nol-map height="500px">
      <nol-view [center]="[0, 0]" [zoom]="initialZoom" [minZoom]="minZoom"></nol-view>
      <nol-tile-layer>
        <nol-osm-source></nol-osm-source>
      </nol-tile-layer>
    </nol-map>
  `
})
export class NolMinZoomExampleComponent implements OnInit, AfterViewInit {

  initialZoom = this.getMinZoom();
  minZoom = this.getMinZoom();

  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    protected renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.listen('window', 'resize', () => {
      this.minZoom = this.getMinZoom();
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.minZoom = this.getMinZoom();
    });
  }

  protected getMinZoom(): number {
    const viewport = this.elementRef.nativeElement.querySelector('nol-map');
    if (viewport) {
      const { width } = viewport.getBoundingClientRect();
      return Math.ceil(Math.LOG2E * Math.log(width / 256));
    }
    return 0;
  }
}
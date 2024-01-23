import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolImageWMSSourceModule } from 'ngx-ol-library/source/image-wms';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-image-wms-source-image-load-events-example',
  standalone: true,
  imports: [
    NolMapModule,
    NolViewModule,
    NolImageLayerModule,
    NolImageWMSSourceModule,
  ],
  template: `
    <div class="wrapper">
      <nol-map [nolHeight]="'400px'" (nolLoadstart)="showProgress()" (nolLoadend)="hideProgress()">
        <nol-view [nolCenter]="[-10997148, 4569099]" [nolZoom]="4" />
        <nol-image-layer>
          <nol-image-wms-source 
            [nolUrl]="'https://ahocevar.com/geoserver/wms'"
            [nolParams]="{
              'LAYERS': 'topp:states'
            }"
            [nolServerType]="'geoserver'"
            (nolImageloadstart)="addLoading()"
            (nolImageloadend)="addLoaded()"
            (nolImageloaderror)="addLoaded()"
          />
        </nol-image-layer>
      </nol-map>
      <div #progress class="progress"></div>
    </div>
  `,
  styles: `
    :host {
      > .wrapper {
        position: relative;
        background: #E0ECED;

        > .progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: rgba(0, 60, 136, 0.4);
          width: 0;
          transition: width 250ms;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolImageWMSSourceImageLoadEventsExampleComponent implements AfterViewInit {

  private progress?: Progress;

  @ViewChild('progress') progressElement!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    this.progress = new Progress(this.progressElement.nativeElement);
  }

  addLoading(): void {
    this.progress?.addLoading();
  }

  addLoaded(): void {
    this.progress?.addLoaded();
  }

  showProgress(): void {
    this.progress?.show();
  }

  hideProgress(): void {
    this.progress?.hide();
  }
}

/**
 * Renders a progress bar.
 * @param {HTMLElement} el The target element.
 * @class
 */
export class Progress {

  private readonly element: HTMLElement;
  private loading = 0;
  private loaded = 0;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  /**
   * Increment the count of loading tiles.
   */
  addLoading(): void {
    ++this.loading;
    this.update();
  }

  /**
   * Increment the count of loaded tiles.
   */
  addLoaded(): void {
    ++this.loaded;
    this.update();
  }

  /**
   * Show the progress bar.
   */
  show(): void {
    this.element.style.visibility = 'visible';
  }

  /**
   * Hide the progress bar.
   */
  hide(): void {
    setTimeout(() => {
      this.element.style.visibility = 'hidden';
      this.element.style.width = '0px';
    }, 250);
  }

  /**
   * Update the progress bar.
   */
  private update(): void {
    const width = ((this.loaded / this.loading) * 100).toFixed(1) + '%';
    this.element.style.width = width;
  }
}
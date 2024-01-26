import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapComponent, NolMapModule } from 'ngx-ol-library/map';
import { NolIIIFSourceModule } from 'ngx-ol-library/source/iiif';
import { NolViewModule } from 'ngx-ol-library/view';
import { HttpClient } from '@angular/common/http';
import IIIFInfo, { ImageInformationResponse } from 'ol/format/IIIFInfo';
import { Options } from 'ol/source/IIIF';
import TileSource from 'ol/source/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';
import { View } from 'ol';

@Component({
  selector: 'nol-iiif-source-sample-example',
  standalone: true,
  imports: [
    FormsModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzTypographyModule,
    NolMapModule,
    NolViewModule,
    NolTileLayerModule,
    NolIIIFSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'" [nolView]="view">
      <nol-tile-layer (nolSourceChange)="onSourceChange($event)">
        @if(options) {
          <nol-iiif-source
            [nolFormat]="options.format"
            [nolQuality]="options.quality"
            [nolResolutions]="options.resolutions"
            [nolSize]="options.size"
            [nolSizes]="options.sizes"
            [nolSupports]="options.supports"
            [nolTileSize]="options.tileSize"
            [nolUrl]="options.url"
            [nolVersion]="options.version"
            [nolZDirection]="options.zDirection"
          />
        }
      </nol-tile-layer>
    </nol-map>
    @if (notification) {
      <div class="notification">{{ notification }}</div>
    }
    <nz-space nzAlign="center">
      <span nz-typography *nzSpaceItem>Enter <code>info.json</code> URL:</span>
      <span *nzSpaceItem>
        <input type="text" nz-input [(ngModel)]="imageInfoUrl">
      </span>
      <span *nzSpaceItem>
        <button nz-button nzType="primary" (click)="refreshMap()">Display image</button>
      </span>
    </nz-space>
  `,
  styles: `
    :host {
      .notification,
      nz-space {
        margin-top: 16px;
      }

      input[nz-input] {
        width: 320px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolIIIFSourceSampleExampleComponent implements OnInit {

  @ViewChild(NolMapComponent) readonly map!: NolMapComponent;

  imageInfoUrl = 'https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0107/0000010732/00000072.jpx/info.json';
  notification?: string;
  options?: Options;
  view?: View;

  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  refreshMap(): void {
    this.options = undefined;
    this.notification = undefined;

    this.http.get<ImageInformationResponse>(this.imageInfoUrl)
      .subscribe({
        next: imageInfo => {
          const options = new IIIFInfo(imageInfo).getTileSourceOptions();
          if (options === undefined || options.version === undefined) {
            this.notification = 'Data seems to be no valid IIIF image information.';
          } else {
            options.zDirection = -1;
          }
          this.options = options;
          this.cdr.markForCheck();
        },
        error: () => {
          this.notification = 'Could not read data from URL.';
          this.cdr.markForCheck();
        },
      });
  }

  onSourceChange(source: TileSource): void {
    if (!source) return;
    const map = this.map.getInstance();
    const tileGrid = source.getTileGrid() as TileGrid;
    this.view = new View({
      resolutions: tileGrid.getResolutions(),
      extent: tileGrid.getExtent(),
      constrainOnlyCenter: true
    });

    map.getView().fit(tileGrid.getExtent());
  }

  ngOnInit(): void {
    this.refreshMap();
  }
}
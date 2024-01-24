import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolImageLayerModule } from 'ngx-ol-library/layer/image';
import { NolTileLayerModule } from 'ngx-ol-library/layer/tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolOSMSourceComponent } from 'ngx-ol-library/source/osm';
import { NolRasterSourceComponent, NolRasterSourceModule } from 'ngx-ol-library/source/raster';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';
import { Operation, RasterSourceEvent } from 'ol/source/Raster';

@Component({
  selector: 'nol-raster-source-shaded-relief-example',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSliderModule,
    NzSpaceModule,
    NolMapModule,
    NolViewModule,
    NolImageLayerModule,
    NolTileLayerModule,
    NolOSMSourceComponent,
    NolXYZSourceModule,
    NolRasterSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[-13615645, 4497969]" [nolZoom]="13" />
      <nol-tile-layer>
        <nol-osm-source />
      </nol-tile-layer>
      <nol-image-layer [nolOpacity]="0.3">
        <nol-raster-source 
          [nolOperationType]="'image'"
          [nolOperation]="shadeOperation"
          (nolBeforeoperations)="onBeforeoperations($event)"
        >
          <nol-xyz-source 
            [nolUrl]="'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'"
            [nolCrossOrigin]="'anonymous'"
            [nolMaxZoom]="15"
            [nolAttributions]="attributions"
          />
        </nol-raster-source>
      </nol-image-layer>
    </nol-map>
    <form nz-form [formGroup]="formGroup">
      <nz-form-item>
        <nz-form-label nzFlex="0 0 150px">vertical exaggeration</nz-form-label>
        <nz-form-control>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>
              <nz-slider
                formControlName="vert"
                [nzMin]="1"
                [nzMax]="5"
                [nzStep]="0.5"
                [nzTooltipVisible]="'never'"
              />
            </span>
            <span *nzSpaceItem>{{ formGroup.getRawValue().vert }} x</span>
          </nz-space>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFlex="0 0 150px">sun elevation</nz-form-label>
        <nz-form-control>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>
              <nz-slider
                formControlName="sunEl"
                [nzMin]="0"
                [nzMax]="90"
                [nzStep]="1"
                [nzTooltipVisible]="'never'"
              />
            </span>
            <span *nzSpaceItem>{{ formGroup.getRawValue().sunEl }} °</span>
          </nz-space>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label nzFlex="0 0 150px">sun azimuth</nz-form-label>
        <nz-form-control>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>
              <nz-slider
                formControlName="sunEl"
                [nzMin]="0"
                [nzMax]="360"
                [nzStep]="1"
                [nzTooltipVisible]="'never'"
              />
            </span>
            <span *nzSpaceItem>{{ formGroup.getRawValue().sunAz }} °</span>
          </nz-space>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: `
    :host > form[nz-form] {
      margin-top: 16px;

      nz-form-item {
        margin-bottom: 0;
      }

      nz-slider {
        display: block;
        width: 200px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolRasterSourceShadedReliefExampleComponent implements OnInit {

  @ViewChild(NolRasterSourceComponent) rasterSource!: NolRasterSourceComponent;

  private readonly destroyRef = inject(DestroyRef);

  readonly attributions = '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank">Data sources and attribution</a>';
  readonly formGroup = new FormGroup({
    vert: new FormControl(1),
    sunEl: new FormControl(45),
    sunAz: new FormControl(45),
  });

  shadeOperation = createShadeOperation();

  onBeforeoperations(evt: RasterSourceEvent): void {
    const { vert, sunAz, sunEl } = this.formGroup.getRawValue();
    const data = evt.data;
    data.resolution = evt.resolution;
    data['vert'] = vert;
    data['sunEl'] = sunEl;
    data['sunAz'] = sunAz;
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.rasterSource.getInstance().changed();
      });
  }
}

function createShadeOperation(): Operation {
  return (inputs, data) => {
    const elevationImage = inputs[0] as ImageData;
    const width = elevationImage.width;
    const height = elevationImage.height;
    const elevationData = elevationImage.data;
    const shadeData = new Uint8ClampedArray(elevationData.length);
    const dp = data.resolution * 2;
    const maxX = width - 1;
    const maxY = height - 1;
    const pixel = [0, 0, 0, 0];
    const twoPi = 2 * Math.PI;
    const halfPi = Math.PI / 2;
    const sunEl = (Math.PI * data.sunEl) / 180;
    const sunAz = (Math.PI * data.sunAz) / 180;
    const cosSunEl = Math.cos(sunEl);
    const sinSunEl = Math.sin(sunEl);
    const calculateElevation = ([R, G, B]: number[]) => -10000 + ((R * 256 * 256 + G * 256 + B) * 0.1);
    let pixelX,
      pixelY,
      x0,
      x1,
      y0,
      y1,
      offset,
      z0,
      z1,
      dzdx,
      dzdy,
      slope,
      aspect,
      cosIncidence,
      scaled;

    for (pixelY = 0; pixelY <= maxY; ++pixelY) {
      y0 = pixelY === 0 ? 0 : pixelY - 1;
      y1 = pixelY === maxY ? maxY : pixelY + 1;
      for (pixelX = 0; pixelX <= maxX; ++pixelX) {
        x0 = pixelX === 0 ? 0 : pixelX - 1;
        x1 = pixelX === maxX ? maxX : pixelX + 1;
  
        // determine elevation for (x0, pixelY)
        offset = (pixelY * width + x0) * 4;
        pixel[0] = elevationData[offset];
        pixel[1] = elevationData[offset + 1];
        pixel[2] = elevationData[offset + 2];
        pixel[3] = elevationData[offset + 3];
        z0 = data.vert * calculateElevation(pixel);
  
        // determine elevation for (x1, pixelY)
        offset = (pixelY * width + x1) * 4;
        pixel[0] = elevationData[offset];
        pixel[1] = elevationData[offset + 1];
        pixel[2] = elevationData[offset + 2];
        pixel[3] = elevationData[offset + 3];
        z1 = data.vert * calculateElevation(pixel);
  
        dzdx = (z1 - z0) / dp;
  
        // determine elevation for (pixelX, y0)
        offset = (y0 * width + pixelX) * 4;
        pixel[0] = elevationData[offset];
        pixel[1] = elevationData[offset + 1];
        pixel[2] = elevationData[offset + 2];
        pixel[3] = elevationData[offset + 3];
        z0 = data.vert * calculateElevation(pixel);
  
        // determine elevation for (pixelX, y1)
        offset = (y1 * width + pixelX) * 4;
        pixel[0] = elevationData[offset];
        pixel[1] = elevationData[offset + 1];
        pixel[2] = elevationData[offset + 2];
        pixel[3] = elevationData[offset + 3];
        z1 = data.vert * calculateElevation(pixel);
  
        dzdy = (z1 - z0) / dp;
  
        slope = Math.atan(Math.sqrt(dzdx * dzdx + dzdy * dzdy));
  
        aspect = Math.atan2(dzdy, -dzdx);
        if (aspect < 0) {
          aspect = halfPi - aspect;
        } else if (aspect > halfPi) {
          aspect = twoPi - aspect + halfPi;
        } else {
          aspect = halfPi - aspect;
        }
  
        cosIncidence =
          sinSunEl * Math.cos(slope) +
          cosSunEl * Math.sin(slope) * Math.cos(sunAz - aspect);
  
        offset = (pixelY * width + pixelX) * 4;
        scaled = 255 * cosIncidence;
        shadeData[offset] = scaled;
        shadeData[offset + 1] = scaled;
        shadeData[offset + 2] = scaled;
        shadeData[offset + 3] = elevationData[offset + 3];
      }
    }
  
    return { 
      data: shadeData, 
      width: width, 
      height: height,
      colorSpace: 'display-p3'
    };
  };
}
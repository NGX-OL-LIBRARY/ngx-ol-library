import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolGeoTIFFSourceModule } from 'ngx-ol-library/source/geotiff';
import { NolViewModule } from 'ngx-ol-library/view';
import { Style } from 'ol/layer/WebGLTile';

@Component({
  selector: 'nol-geotiff-source-reprojection-example',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzSpaceModule,
    NzSelectModule,
    NzSliderModule,
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolGeoTIFFSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" [nolMaxZoom]="6" />
      <nol-webgl-tile-layer [nolStyle]="style" [nolStyleVariables]="variables">
        <nol-geotiff-source 
          [nolNormalize]="false"
          [nolSources]="[
            {
              url: 'https://s2downloads.eox.at/demo/EOxCloudless/2020/rgbnir/s2cloudless2020-16bits_sinlge-file_z0-4.tif'
            }
          ]"
          [nolWrapX]="true"
        />
      </nol-webgl-tile-layer>
    </nol-map>
    <form [formGroup]="formGroup">
      <div nz-row nzAlign="middle" [nzGutter]="16">
        <div nz-col nzFlex="0 0 100px">Red channel</div>
        <div nz-col>
          <nz-select formControlName="red">
            <nz-option [nzValue]="1" nzLabel="visible red" />
            <nz-option [nzValue]="2" nzLabel="visible green" />
            <nz-option [nzValue]="3" nzLabel="visible blue" />
            <nz-option [nzValue]="4" nzLabel="near infrared" />
          </nz-select>
        </div>
        <div nz-col>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>max</span>
            <span *nzSpaceItem>
            <nz-slider formControlName="redMax" [nzMin]="2000" [nzMax]="5000" />
            </span>
          </nz-space>
        </div>
      </div>
      <div nz-row nzAlign="middle" [nzGutter]="16">
        <div nz-col nzFlex="0 0 100px">Green channel</div>
        <div nz-col>
          <nz-select formControlName="green">
            <nz-option [nzValue]="1" nzLabel="visible red" />
            <nz-option [nzValue]="2" nzLabel="visible green" />
            <nz-option [nzValue]="3" nzLabel="visible blue" />
            <nz-option [nzValue]="4" nzLabel="near infrared" />
          </nz-select>
        </div>
        <div nz-col>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>max</span>
            <span *nzSpaceItem>
            <nz-slider formControlName="greenMax" [nzMin]="2000" [nzMax]="5000" />
            </span>
          </nz-space>
        </div>
      </div>
      <div nz-row nzAlign="middle" [nzGutter]="16">
        <div nz-col nzFlex="0 0 100px">Blue channel</div>
        <div nz-col>
          <nz-select formControlName="blue">
            <nz-option [nzValue]="1" nzLabel="visible red" />
            <nz-option [nzValue]="2" nzLabel="visible green" />
            <nz-option [nzValue]="3" nzLabel="visible blue" />
            <nz-option [nzValue]="4" nzLabel="near infrared" />
          </nz-select>
        </div>
        <div nz-col>
          <nz-space nzAlign="center">
            <span *nzSpaceItem>max</span>
            <span *nzSpaceItem>
            <nz-slider formControlName="blueMax" [nzMin]="2000" [nzMax]="5000" />
            </span>
          </nz-space>
        </div>
      </div>
    </form>
  `,
  styles: `
    :host > form {
      margin-top: 16px;

      nz-select {
        width: 150px;
      }

      nz-slider {
        display: block;
        width: 200px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolGeoTIFFSourceReprojectionExampleComponent {

  private readonly cdr = inject(ChangeDetectorRef);
  readonly formGroup = new FormGroup({
    red: new FormControl(1, { nonNullable: true }),
    redMax: new FormControl(3000, { nonNullable: true }),
    green: new FormControl(2, { nonNullable: true }),
    greenMax: new FormControl(3000, { nonNullable: true }),
    blue: new FormControl(3, { nonNullable: true }),
    blueMax: new FormControl(3000, { nonNullable: true }),
  });

  public variables = this.formGroup.getRawValue();
  public style: Style = {
    variables: this.variables,
    color: [
      'array',
      ['/', ['band', ['var', 'red']], ['var', 'redMax']],
      ['/', ['band', ['var', 'green']], ['var', 'greenMax']],
      ['/', ['band', ['var', 'blue']], ['var', 'blueMax']],
      1,
    ],
  };

  constructor() {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.variables = this.formGroup.getRawValue();
        this.cdr.markForCheck();
      });
  }
}
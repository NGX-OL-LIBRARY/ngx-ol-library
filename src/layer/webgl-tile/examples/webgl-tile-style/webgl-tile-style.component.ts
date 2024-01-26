import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolXYZSourceModule } from 'ngx-ol-library/source/xyz';
import { NolViewModule } from 'ngx-ol-library/view';

@Component({
  selector: 'nol-webgl-tile-layer-webgl-tile-style-example',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzSliderModule,
    NzSpaceModule,
    NzGridModule,
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolXYZSourceModule,
  ],
  template: `
    <nol-map [nolHeight]="'400px'">
      <nol-view [nolCenter]="[0, 0]" [nolZoom]="0" />
      <nol-webgl-tile-layer
        [nolStyle]="{
          exposure: ['var', 'exposure'],
          contrast: ['var', 'contrast'],
          saturation: ['var', 'saturation'],
          variables: variables,
        }" 
        [nolStyleVariables]="variables"
      >
        <nol-xyz-source 
          [nolAttributions]="attributions"
          [nolUrl]="'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + maptilerKey"
          [nolMaxZoom]="20"
        />
      </nol-webgl-tile-layer>
    </nol-map>
    <form nz-row [nzJustify]="'space-evenly'" [nzAlign]="'middle'" [formGroup]="formGroup">
      <div nz-col>
        <nz-slider 
          formControlName="exposure" 
          [nzMin]="-0.5" 
          [nzMax]="0.5" 
          [nzStep]="0.01" 
          [nzTooltipVisible]="'never'"
        />
        <nz-space nzAlign="center">
          <span *nzSpaceItem>exposure:</span>
          <span *nzSpaceItem>{{ variables.exposure }}</span>
        </nz-space>
      </div>
      <div nz-col>
        <nz-slider 
          formControlName="contrast" 
          [nzMin]="-0.5" 
          [nzMax]="0.5" 
          [nzStep]="0.01" 
          [nzTooltipVisible]="'never'"
        />
        <nz-space nzAlign="center">
          <span *nzSpaceItem>contrast:</span>
          <span *nzSpaceItem>{{ variables.contrast }}</span>
        </nz-space>
      </div>
      <div nz-col>
        <nz-slider 
          formControlName="saturation" 
          [nzMin]="-0.5" 
          [nzMax]="0.5" 
          [nzStep]="0.01" 
          [nzTooltipVisible]="'never'"
        />
        <nz-space nzAlign="center">
          <span *nzSpaceItem>saturation:</span>
          <span *nzSpaceItem>{{ variables.saturation }}</span>
        </nz-space>
      </div>
    </form>
  `,
  styles: `
    :host > form {
      margin-top: 16px;

      nz-slider {
        display: block;
        width: 200px;
      }

      nz-space {
        margin: 0 6px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolWebGLTileLayerWebGLTileStyleExampleComponent {

  readonly maptilerKey = '7jx6f95NRPBf65vIETCS';
  readonly attributions = 
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

  readonly formGroup = new FormGroup({
    exposure: new FormControl(0, { nonNullable: true }),
    contrast: new FormControl(0, { nonNullable: true }),
    saturation: new FormControl(0, { nonNullable: true }),
  });

  public variables = {
    exposure: 0,
    contrast: 0,
    saturation: 0,
  };

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.variables = this.formGroup.getRawValue();
        this.cdr.markForCheck();
      });
  }
}
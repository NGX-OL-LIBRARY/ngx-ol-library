import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { GeoTIFFSourceOptions } from 'ol/source/GeoTIFF';

@Component({
  selector: 'nol-source-options',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSourceOptionsComponent implements GeoTIFFSourceOptions {

  @Input() forceXHR?: boolean;
  @Input() headers?: Record<string, string>;
  @Input() credentials?: string;
  @Input() maxRanges?: number;
  @Input() allowFullFile?: boolean;
  @Input() blockSize?: number;
  @Input() cacheSize?: number;

  get instance(): GeoTIFFSourceOptions {
    return {
      forceXHR: this.forceXHR,
      headers: this.headers,
      credentials: this.credentials,
      maxRanges: this.maxRanges,
      allowFullFile: this.allowFullFile,
      blockSize: this.blockSize,
      cacheSize: this.cacheSize
    };
  }

  constructor() { }

}

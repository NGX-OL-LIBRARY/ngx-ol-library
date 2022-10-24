import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { SourceInfo } from 'ol/source/GeoTIFF';

@Component({
  selector: 'nol-source-info',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSourceInfoComponent implements SourceInfo {

  @Input() url?: string;
  @Input() overviews?: string[];
  @Input() blob?: Blob;
  @Input() min?: number;
  @Input() max?: number;
  @Input() nodata?: number;
  @Input() bands?: number[];

  get instance(): SourceInfo {
    return {
      url: this.url,
      overviews: this.overviews,
      blob: this.blob,
      min: this.min,
      max: this.max,
      nodata: this.nodata,
      bands: this.bands
    };
  }

  constructor() { }

}

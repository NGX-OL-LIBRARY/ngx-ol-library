import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Host,
  Input,
  OnInit,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { NolWebGLTileLayerComponent } from 'ngx-ol-library/layer/webgl-tile';
import { NolDataTileSourceComponent } from 'ngx-ol-library/source/data-tile';
import GeoTIFFSource, { GeoTIFFSourceOptions, Options, SourceInfo } from 'ol/source/GeoTIFF';
import { NolSourceInfoComponent } from './source-info.component';
import { NolSourceOptionsComponent } from './source-options.component';

@Component({
  selector: 'nol-geotiff-source',
  exportAs: 'nolGeoTIFFSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGeoTIFFSourceComponent extends NolDataTileSourceComponent<GeoTIFFSource> implements OnInit, AfterViewInit, Options {

  @Input() sources!: Array<SourceInfo>;
  @Input() sourceOptions?: GeoTIFFSourceOptions;
  @Input() convertToRGB?: boolean | "auto";
  @Input() normalize?: boolean;

  @ContentChild(NolSourceOptionsComponent) sourceOptionsComponent!: NolSourceOptionsComponent;
  @ContentChildren(NolSourceInfoComponent) sourceInfoComponents!: QueryList<NolSourceInfoComponent>;

  constructor(@Host() webGLTileLayerHost: NolWebGLTileLayerComponent) { 
    super(webGLTileLayerHost);
  }

  override ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.sourceInfoComponents) {
      this.sourceOptions = this.sourceOptionsComponent.instance;
    }
    if (this.sourceInfoComponents.length > 0) {
      this.sources = this.sourceInfoComponents.map(s => s.instance);
    }
    this.instance = new GeoTIFFSource(this);
    super.ngOnInit();
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolBaseTileLayerComponent } from 'ngx-ol-library/layer/base-tile';
import { NolLayerGroupComponent } from 'ngx-ol-library/layer/layer-group';
import { Extent } from 'ol/extent';
import WebGLTileLayer, { Options, Style, SourceType } from 'ol/layer/WebGLTile';
import RenderEvent from 'ol/render/Event';

@Component({
  selector: 'nol-webgl-tile-layer',
  exportAs: 'nolWebglTileLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolWebGLTileLayerComponent extends NolBaseTileLayerComponent<WebGLTileLayer> implements OnInit, Options {

  @Input() style?: Style;
  @Input() override source?: SourceType;
  @Input() sources?: SourceType[] | ((extent: Extent, resolution: number) => SourceType[]);
  @Input() cacheSize?: number;

  @Output() onPostcompose = new EventEmitter<RenderEvent>();
  @Output() onPrecompose = new EventEmitter<RenderEvent>();
  @Output() onRendercomplete = new EventEmitter<RenderEvent>();

  constructor(
    @Optional() mapHost?: NolMapComponent,
    @Optional() layerGroupHost?: NolLayerGroupComponent
  ) { 
    super(mapHost, layerGroupHost);
  }

  override ngOnInit(): void {
    this.instance = new WebGLTileLayer(this);
    this.instance.on('postcompose' as any, (event: RenderEvent) => this.onPostcompose.emit(event));
    this.instance.on('precompose' as any, (event: RenderEvent) => this.onPrecompose.emit(event));
    this.instance.on('rendercomplete' as any, (event: RenderEvent) => this.onRendercomplete.emit(event));
    super.ngOnInit();
  }

}

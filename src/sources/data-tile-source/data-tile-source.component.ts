import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolWebGLTileLayerComponent } from 'ngx-ol-library/layers/webgl-tile-layer';
import { NolTileSourceComponent } from 'ngx-ol-library/sources/tile-source';
import { Size } from 'ol/size';
import DataTileSource, { Loader, Options } from 'ol/source/DataTile';
import { TileSourceEvent } from 'ol/source/Tile';

@Component({
  selector: 'nol-data-tile-source',
  exportAs: 'nolDataTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDataTileSourceComponent<InstanceType extends DataTileSource = DataTileSource> extends NolTileSourceComponent<InstanceType> implements OnInit, Options {

  @Input() loader?: Loader;
  @Input() maxZoom?: number;
  @Input() minZoom?: number;
  @Input() tileSize?: number | Size;
  @Input() gutter?: number;
  @Input() maxResolution?: number;
  @Input() bandCount?: number;

  @Output() onTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() onTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() onTileloadstart = new EventEmitter<TileSourceEvent>();

  constructor(@Host() webGLTileLayerHost: NolWebGLTileLayerComponent) { 
    super(undefined, undefined, webGLTileLayerHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new DataTileSource(this) as InstanceType;
    }
    this.instance.on('tileloadend', (event: TileSourceEvent) => this.onTileloadend.emit(event));
    this.instance.on('tileloaderror', (event: TileSourceEvent) => this.onTileloaderror.emit(event));
    this.instance.on('tileloadstart', (event: TileSourceEvent) => this.onTileloadstart.emit(event));
    super.ngOnInit();
  }

}

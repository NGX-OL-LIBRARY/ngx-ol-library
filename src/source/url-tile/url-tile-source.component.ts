import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolTileLayerComponent } from 'ngx-ol-library/layer/tile';
import { NolVectorTileLayerComponent } from 'ngx-ol-library/layer/vector-tile';
import { NolTileSourceComponent } from 'ngx-ol-library/source/tile';
import { TileSourceEvent } from 'ol/source/Tile';
import UrlTile, { Options } from 'ol/source/UrlTile';
import { LoadFunction, UrlFunction } from 'ol/Tile';

@Component({
  selector: 'nol-url-tile-source',
  exportAs: 'nolUrlTileSource',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolUrlTileSourceComponent<InstanceType extends UrlTile = UrlTile> extends NolTileSourceComponent<InstanceType> implements OnInit, OnChanges, Options {

  @Input() tileLoadFunction!: LoadFunction;
  @Input() tileUrlFunction?: UrlFunction;
  @Input() url?: string;
  @Input() urls?: string[];

  @Output() onTileloadend = new EventEmitter<TileSourceEvent>();
  @Output() onTileloaderror = new EventEmitter<TileSourceEvent>();
  @Output() onTileloadstart = new EventEmitter<TileSourceEvent>();

  constructor(
    @Optional() @Host() tileLayerHost?: NolTileLayerComponent,
    @Optional() @Host() vectorTileLayerHost?: NolVectorTileLayerComponent,
  ) { 
    super(tileLayerHost, vectorTileLayerHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new UrlTile(this) as InstanceType;
    }
    this.instance.on('tileloadend', (event: TileSourceEvent) => this.onTileloadend.emit(event));
    this.instance.on('tileloaderror', (event: TileSourceEvent) => this.onTileloaderror.emit(event));
    this.instance.on('tileloadstart', (event: TileSourceEvent) => this.onTileloadstart.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { tileLoadFunction, tileUrlFunction, url, urls, ...restChanges } = changes;
    if (this.instance && tileLoadFunction) {
      this.instance.setTileLoadFunction(tileLoadFunction.currentValue);
    }
    if (this.instance && tileUrlFunction) {
      this.instance.setTileUrlFunction(tileUrlFunction.currentValue);
    }
    if (this.instance && url) {
      this.instance.setUrl(url.currentValue);
    }
    if (this.instance && urls) {
      this.instance.setUrls(urls.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

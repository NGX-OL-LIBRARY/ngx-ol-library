import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolVectorImageLayerComponent } from 'ngx-ol-library/layer/vector-image';
import { NolVectorLayerComponent } from 'ngx-ol-library/layer/vector';
import { NolVectorTileLayerComponent } from 'ngx-ol-library/layer/vector-tile';
import { Geometry } from 'ol/geom';
import Fill from 'ol/style/Fill';
import ImageStyle from 'ol/style/Image';
import Stroke from 'ol/style/Stroke';
import Style, { GeometryFunction, Options, RenderFunction } from 'ol/style/Style';
import Text from 'ol/style/Text';

@Component({
  selector: 'nol-style',
  exportAs: 'nolStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input() geometry?: string | Geometry | GeometryFunction;
  @Input() fill?: Fill;
  @Input() image?: ImageStyle;
  @Input() renderer?: RenderFunction;
  @Input() hitDetectionRenderer?: RenderFunction;
  @Input() stroke?: Stroke;
  @Input() text?: Text;
  @Input() zIndex?: number;

  public instance!: Style;
  protected host?: NolVectorLayerComponent | NolVectorImageLayerComponent | NolVectorTileLayerComponent;

  constructor(
    @Optional() vectorLayerHost?: NolVectorLayerComponent,
    @Optional() vectorImageLayerHost?: NolVectorImageLayerComponent,
    @Optional() vectorTileLayerHost?: NolVectorTileLayerComponent
  ) { 
    this.host = vectorLayerHost || vectorImageLayerHost || vectorTileLayerHost;
    if (!this.host) {
      throw new Error(`nol-style must be nested in a VectorLayer, VectorImageLayer or VectorTileLayer.`);
    }
  }

  update(): void {
    this.host?.instance.changed();
  }

  ngOnInit(): void {
    this.instance = new Style(this);
    this.host?.instance.setStyle(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      for (const key in changes) {
        if (Object.prototype.hasOwnProperty.call(changes, key)) {
          const value = changes[key].currentValue;
          switch(key) {
            case 'geometry':
              this.instance.setGeometry(value);
              break;
            case 'fill':
              this.instance.setFill(value);
              break;
            case 'image':
              this.instance.setImage(value);
              break;
            case 'renderer':
              this.instance.setRenderer(value);
              break;
            case 'hitDetectionRenderer':
              this.instance.setHitDetectionRenderer(value);
              break;
            case 'stroke':
              this.instance.setStroke(value);
              break;
            case 'text':
              this.instance.setText(value);
              break;
            case 'zIndex':
              this.instance.setZIndex(value);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.host?.instance.setStyle(null);
  }

}

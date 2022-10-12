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
import { NolLayerGroupComponent } from 'ngx-ol-library/layers/layer-group';
import { NolVectorLayerComponent } from 'ngx-ol-library/layers/vector-layer';
import Graticule, { Options } from 'ol/layer/Graticule';
import RenderEvent from 'ol/render/Event';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';

@Component({
  selector: 'nol-graticule-layer',
  exportAs: 'nolGraticuleLayer',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGraticuleLayerComponent extends NolVectorLayerComponent<Graticule> implements OnInit, Options {

  @Input() maxLines?: number;
  @Input() strokeStyle?: Stroke;
  @Input() targetSize?: number;
  @Input() showLabels?: boolean;
  @Input() lonLabelFormatter?: ((arg0: number) => string);
  @Input() latLabelFormatter?: ((arg0: number) => string);
  @Input() lonLabelPosition?: number;
  @Input() latLabelPosition?: number;
  @Input() lonLabelStyle?: Text;
  @Input() latLabelStyle?: Text;
  @Input() intervals?: number[];
  @Input() wrapX?: boolean;

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
    this.instance = new Graticule(this);
    this.instance.on('postcompose' as any, (event: RenderEvent) => this.onPostcompose.emit(event));
    this.instance.on('precompose' as any, (event: RenderEvent) => this.onPrecompose.emit(event));
    this.instance.on('rendercomplete' as any, (event: RenderEvent) => this.onRendercomplete.emit(event));
    super.ngOnInit();
  }

}

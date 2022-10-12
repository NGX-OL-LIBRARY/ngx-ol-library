import { 
  AfterViewInit,
  ChangeDetectionStrategy, 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnChanges, 
  OnInit, 
  Output, 
  Renderer2, 
  SimpleChanges, 
  ViewEncapsulation 
} from '@angular/core';
import { Collection, MapBrowserEvent, MapEvent, Overlay } from 'ol';
import Control from 'ol/control/Control';
import Interaction from 'ol/interaction/Interaction';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import Map, { MapOptions } from 'ol/Map';
import { ObjectEvent } from 'ol/Object';
import RenderEvent from 'ol/render/Event';
import View, { ViewOptions } from 'ol/View';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';

@Component({
  selector: 'nol-map',
  exportAs: 'nolMap',
  template: `
    <div [style.width]="width" [style.height]="height"></div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMapComponent extends NolBaseObjectComponent<Map> implements OnInit, OnChanges, AfterViewInit, MapOptions {

  @Input() width: number | string = '100%';
  @Input() height: number | string = '100%';
  @Input() controls?: Collection<Control> | Control[];
  @Input() pixelRatio?: number;
  @Input() interactions?: Collection<Interaction> | Interaction[];
  @Input() keyboardEventTarget?: string | Document | HTMLElement;
  @Input() layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
  @Input() maxTilesLoading?: number;
  @Input() moveTolerance?: number;
  @Input() overlays?: Collection<Overlay> | Overlay[];
  @Input() target?: string | HTMLElement;
  @Input() targetAttributes?: Record<string, any>;
  @Input() view?: Promise<ViewOptions> | View;

  @Output() onLayerGroupChange = new EventEmitter<ObjectEvent>();
  @Output() onSizeChange = new EventEmitter<ObjectEvent>();
  @Output() onTargetChange = new EventEmitter<ObjectEvent>();
  @Output() onViewChange = new EventEmitter<ObjectEvent>();
  @Output() onClick = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output() onDblclick = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output() onLoadend = new EventEmitter<MapEvent>();
  @Output() onLoadstart = new EventEmitter<MapEvent>();
  @Output() onMoveend = new EventEmitter<MapEvent>();
  @Output() onMovestart = new EventEmitter<MapEvent>();
  @Output() onPointerdrag = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output() onPointermove = new EventEmitter<MapBrowserEvent<UIEvent>>();
  @Output() onPostcompose = new EventEmitter<RenderEvent>();
  @Output() onPostrender = new EventEmitter<MapEvent>();
  @Output() onPrecompose = new EventEmitter<RenderEvent>();
  @Output() onRendercomplete = new EventEmitter<RenderEvent>();
  @Output() onSingleclick = new EventEmitter<MapBrowserEvent<UIEvent>>();

  constructor(
    protected elementRef: ElementRef<HTMLDivElement>,
    protected renderer: Renderer2
  ) { 
    super();
  }

  override ngOnInit(): void {
    if (!this.target) {
      this.target = this.elementRef.nativeElement.firstChild as HTMLElement;
    }
    if (this.targetAttributes) {
      this.bindAttributes(this.targetAttributes);
    }
    
    this.instance = new Map(this);
    this.instance.on('change:layergroup', (event: ObjectEvent) => this.onLayerGroupChange.emit(event));
    this.instance.on('change:size', (event: ObjectEvent) => this.onSizeChange.emit(event));
    this.instance.on('change:target', (event: ObjectEvent) => this.onTargetChange.emit(event));
    this.instance.on('change:view', (event: ObjectEvent) => this.onViewChange.emit(event));
    this.instance.on('click', (event: MapBrowserEvent<UIEvent>) => this.onClick.emit(event));
    this.instance.on('dblclick', (event: MapBrowserEvent<UIEvent>) => this.onDblclick.emit(event));
    this.instance.on('loadend', (event: MapEvent) => this.onLoadend.emit(event));
    this.instance.on('loadstart', (event: MapEvent) => this.onLoadstart.emit(event));
    this.instance.on('moveend', (event: MapEvent) => this.onMoveend.emit(event));
    this.instance.on('movestart', (event: MapEvent) => this.onMovestart.emit(event));
    this.instance.on('pointerdrag', (event: MapBrowserEvent<UIEvent>) => this.onPointerdrag.emit(event));
    this.instance.on('pointermove', (event: MapBrowserEvent<UIEvent>) => this.onPointermove.emit(event));
    this.instance.on('postcompose', (event: RenderEvent) => this.onPostcompose.emit(event));
    this.instance.on('postrender', (event: MapEvent) => this.onPostrender.emit(event));
    this.instance.on('precompose', (event: RenderEvent) => this.onPrecompose.emit(event));
    this.instance.on('rendercomplete', (event: RenderEvent) => this.onRendercomplete.emit(event));
    this.instance.on('singleclick', (event: MapBrowserEvent<UIEvent>) => this.onSingleclick.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { layers, target, view, ...restChanges } = changes;
    if (this.instance && layers) {
      this.instance.setLayers(layers.currentValue);
    }
    if (this.instance && target) {
      this.instance.setTarget(target.currentValue);
    }
    if (this.instance && view) {
      this.instance.setView(view.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngAfterViewInit(): void {
    this.instance.updateSize();
  }

  protected bindAttributes(attributes: Record<string, any>): void {
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        this.renderer.setAttribute(this.target, key, attributes[key]);
      }
    }
  }

}

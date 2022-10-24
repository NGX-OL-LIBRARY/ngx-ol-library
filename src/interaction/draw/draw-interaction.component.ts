import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import Geometry, { Type as GeometryType, GeometryLayout } from 'ol/geom/Geometry';
import Draw, { DrawEvent, GeometryFunction, Options } from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import { FlatStyleLike } from 'ol/style/flat.js';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-draw-interaction',
  exportAs: 'nolDrawInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDrawInteractionComponent extends NolPointerInteractionComponent<Draw> implements OnInit, Options {

  @Input() type!: GeometryType;
  @Input() clickTolerance?: number;
  @Input() features?: Collection<Feature>;
  @Input() source?: VectorSource<Geometry>;
  @Input() dragVertexDelay?: number;
  @Input() snapTolerance?: number;
  @Input() stopClick?: boolean;
  @Input() maxPoints?: number;
  @Input() minPoints?: number;
  @Input() finishCondition?: Condition;
  @Input() style?: StyleLike | FlatStyleLike;
  @Input() geometryFunction?: GeometryFunction;
  @Input() geometryName?: string;
  @Input() condition?: Condition;
  @Input() freehand?: boolean;
  @Input() freehandCondition?: Condition;
  @Input() trace?: boolean | Condition;
  @Input() traceSource?: VectorSource<Geometry>;
  @Input() wrapX?: boolean;
  @Input() geometryLayout?: GeometryLayout;

  @Output() onDrawabort = new EventEmitter<DrawEvent>();
  @Output() onDrawend = new EventEmitter<DrawEvent>();
  @Output() onDrawstart = new EventEmitter<DrawEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Draw(this);
    this.instance.on('drawabort', (event: DrawEvent) => this.onDrawabort.emit(event));
    this.instance.on('drawend', (event: DrawEvent) => this.onDrawend.emit(event));
    this.instance.on('drawstart', (event: DrawEvent) => this.onDrawstart.emit(event));
    super.ngOnInit();
  }

}

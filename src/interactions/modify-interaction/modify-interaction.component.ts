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
import { NolPointerInteractionComponent } from 'ngx-ol-library/interactions/pointer-interaction';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import Modify, { ModifyEvent, Options } from 'ol/interaction/Modify';
import BaseVectorLayer from 'ol/layer/BaseVector';
import VectorSource from 'ol/source/Vector';
import { FlatStyleLike } from 'ol/style/flat';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-modify-interaction',
  exportAs: 'nolModifyInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolModifyInteractionComponent extends NolPointerInteractionComponent<Modify> implements OnInit, Options {

  @Input() condition?: Condition;
  @Input() deleteCondition?: Condition;
  @Input() insertVertexCondition?: Condition;
  @Input() pixelTolerance?: number;
  @Input() style?: StyleLike | FlatStyleLike;
  @Input() source?: VectorSource<Geometry>;
  @Input() hitDetection?: boolean | BaseVectorLayer<any, any>;
  @Input() features?: Collection<Feature<Geometry>>;
  @Input() wrapX?: boolean;
  @Input() snapToPointer?: boolean;

  @Output() onModifyend = new EventEmitter<ModifyEvent>();
  @Output() onModifystart = new EventEmitter<ModifyEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Modify(this);
    this.instance.on('modifyend', (event: ModifyEvent) => this.onModifyend.emit(event));
    this.instance.on('modifystart', (event: ModifyEvent) => this.onModifystart.emit(event));
    super.ngOnInit();
  }

}

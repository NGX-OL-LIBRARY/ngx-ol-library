import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interactions/interaction';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import Select, { FilterFunction, Options, SelectEvent } from 'ol/interaction/Select';
import Layer from 'ol/layer/Layer';
import LayerRenderer from 'ol/renderer/Layer.js';
import Source from 'ol/source/Source';
import { StyleLike } from 'ol/style/Style';

@Component({
  selector: 'nol-select-interaction',
  exportAs: 'nolSelectInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSelectInteractionComponent extends NolInteractionComponent<Select> implements OnInit, OnChanges, Options {

  @Input() addCondition?: Condition;
  @Input() condition?: Condition;
  @Input() layers?: Layer<Source, LayerRenderer<any>>[] | ((layer: Layer<Source>) => boolean);
  @Input() style?: StyleLike | null;
  @Input() removeCondition?: Condition;
  @Input() toggleCondition?: Condition;
  @Input() multi?: boolean;
  @Input() features?: Collection<Feature<Geometry>>;
  @Input() filter?: FilterFunction;
  @Input() hitTolerance?: number;

  @Output() onSelect = new EventEmitter<SelectEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Select(this);
    this.instance.on('select', (event: SelectEvent) => this.onSelect.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { hitTolerance, ...restChanges } = changes;
    if (this.instance && hitTolerance) {
      this.instance.setHitTolerance(hitTolerance.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

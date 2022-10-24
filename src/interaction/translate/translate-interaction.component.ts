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
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Collection, Feature } from 'ol';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import Translate, { FilterFunction, Options, TranslateEvent } from 'ol/interaction/Translate';
import Layer from 'ol/layer/Layer';
import LayerRenderer from 'ol/renderer/Layer.js';
import Source from 'ol/source/Source';

@Component({
  selector: 'nol-translate-interaction',
  exportAs: 'nolTranslateInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTranslateInteractionComponent extends NolPointerInteractionComponent<Translate> implements OnInit, OnChanges, Options {

  @Input() condition?: Condition;
  @Input() features?: Collection<Feature<Geometry>>;
  @Input() layers?: Layer<Source, LayerRenderer<any>>[] | ((layer: Layer<Source>) => boolean);
  @Input() filter?: FilterFunction;
  @Input() hitTolerance?: number;

  @Output() onTranslateend = new EventEmitter<TranslateEvent>();
  @Output() onTranslatestart = new EventEmitter<TranslateEvent>();
  @Output() onTranslating = new EventEmitter<TranslateEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Translate(this);
    this.instance.on('translateend', (event: TranslateEvent) => this.onTranslateend.emit(event));
    this.instance.on('translatestart', (event: TranslateEvent) => this.onTranslatestart.emit(event));
    this.instance.on('translating', (event: TranslateEvent) => this.onTranslating.emit(event));
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

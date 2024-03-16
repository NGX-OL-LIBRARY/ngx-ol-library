import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  InjectOptions,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { Collection, Feature } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Condition } from 'ol/events/condition';
import { Geometry } from 'ol/geom';
import { StyleLike } from 'ol/style/Style';
import BaseEvent from 'ol/events/Event';
import Layer from 'ol/layer/Layer.js';
import LayerRenderer from 'ol/renderer/Layer.js';
import Source from 'ol/source/Source.js';
import Select, {
  FilterFunction,
  Options,
  SelectEvent
} from 'ol/interaction/Select';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component for selecting vector features.
 * @name nol-select-interaction
 * @order 1
 */
@Component({
  selector: 'nol-select-interaction',
  exportAs: 'nolSelectInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSelectInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {
  
  @Input() nolActive: boolean = true;
  @Input() nolAddCondition?: Condition;
  @Input() nolCondition?: Condition;
  @Input() nolLayers?: Layer<Source, LayerRenderer<NolSafeAny>>[] | ((layer: Layer<Source>) => boolean);
  @Input() nolStyle?: StyleLike | null;
  @Input() nolRemoveCondition?: Condition;
  @Input() nolToggleCondition?: Condition;
  @Input() nolMulti?: boolean;
  @Input() nolFeatures?: Collection<Feature<Geometry>>;
  @Input() nolFilter?: FilterFunction;
  @Input() nolHitTolerance?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolSelect = new EventEmitter<SelectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Select;

  getInstance(): Select {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Select({
      addCondition: this.nolAddCondition,
      condition: this.nolCondition,
      layers: this.nolLayers,
      style: this.nolStyle,
      removeCondition: this.nolRemoveCondition,
      toggleCondition: this.nolToggleCondition,
      multi: this.nolMulti,
      features: this.nolFeatures,
      filter: this.nolFilter,
      hitTolerance: this.nolHitTolerance,
    });

    this.instance.setActive(this.nolActive);

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });
      
    fromEvent<BaseEvent>(this.instance, 'change:active')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolActive = this.instance.getActive();
        this.nolActiveChange.emit(this.nolActive);
        this.cdr.markForCheck();
      });
      
    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });
      
    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    fromEvent<SelectEvent>(this.instance, 'select')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolSelect.emit(evt);
      });
      
    this.host.getInstance().addInteraction(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolActive, nolHitTolerance, nolProperties } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolHitTolerance) {
      this.instance.setHitTolerance(nolHitTolerance.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function useSelectInteraction(): NolSelectInteractionComponent;
export function useSelectInteraction(options: InjectOptions & {optional?: false}): NolSelectInteractionComponent;
export function useSelectInteraction(options: InjectOptions): NolSelectInteractionComponent | null;
export function useSelectInteraction(options?: InjectOptions): NolSelectInteractionComponent | null  {
  return inject(NolSelectInteractionComponent, options || {}) || null;
}

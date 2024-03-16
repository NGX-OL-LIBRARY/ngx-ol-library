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
import BaseEvent from 'ol/events/Event';
import Layer from 'ol/layer/Layer';
import LayerRenderer from 'ol/renderer/Layer';
import Source from 'ol/source/Source';
import Translate, {
  FilterFunction,
  Options,
  TranslateEvent
} from 'ol/interaction/Translate';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';


/**
 * An interaction component for translating (moving) features.
 * @name nol-translate-interaction
 * @order 1
 */
@Component({
  selector: 'nol-translate-interaction',
  exportAs: 'nolTranslateInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTranslateInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolCondition?: Condition;
  @Input() nolFeatures?: Collection<Feature<Geometry>>;
  @Input() nolLayers?: Layer<Source, LayerRenderer<NolSafeAny>>[] | ((layer: Layer<Source>) => boolean);
  @Input() nolFilter?: FilterFunction;
  @Input() nolHitTolerance?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() noltranslateend = new EventEmitter<TranslateEvent>();
  @Output() noltranslatestart = new EventEmitter<TranslateEvent>();
  @Output() noltranslating = new EventEmitter<TranslateEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Translate;

  getInstance(): Translate {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Translate({
      condition: this.nolCondition,
      features: this.nolFeatures,
      layers: this.nolLayers,
      filter: this.nolFilter,
      hitTolerance: this.nolHitTolerance
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

    fromEvent<ObjectEvent>(this.instance, 'change:active')
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

    fromEvent<TranslateEvent>(this.instance, 'translateend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.noltranslateend.emit(evt);
      });

    fromEvent<TranslateEvent>(this.instance, 'translatestart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.noltranslatestart.emit(evt);
      });

    fromEvent<TranslateEvent>(this.instance, 'translating')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.noltranslating.emit(evt);
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

export function useTranslateInteraction(): NolTranslateInteractionComponent;
export function useTranslateInteraction(options: InjectOptions & {optional?: false}): NolTranslateInteractionComponent;
export function useTranslateInteraction(options: InjectOptions): NolTranslateInteractionComponent | null;
export function useTranslateInteraction(options?: InjectOptions): NolTranslateInteractionComponent | null  {
  return inject(NolTranslateInteractionComponent, options || {}) || null;
}

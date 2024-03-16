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
import { Geometry } from 'ol/geom';
import { SnapEvent } from 'ol/events/SnapEvent';
import BaseEvent from 'ol/events/Event';
import VectorSource from 'ol/source/Vector';
import Snap, { Options } from 'ol/interaction/Snap';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component that handles snapping of vector features while modifying 
 * or drawing them.
 * @name nol-snap-interaction
 * @order 1
 */
@Component({
  selector: 'nol-snap-interaction',
  exportAs: 'nolSnapInteraction',
  standalone: true,
  template:  `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSnapInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive = true;
  @Input() nolFeatures?: Collection<Feature<Geometry>>;
  @Input() nolEdge?: boolean;
  @Input() nolVertex?: boolean;
  @Input() nolPixelTolerance?: number;
  @Input() nolSource?: VectorSource<Feature<Geometry>>;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolSnap = new EventEmitter<SnapEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Snap;

  getInstance(): Snap {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Snap({
      features: this.nolFeatures,
      edge: this.nolEdge,
      vertex: this.nolVertex,
      pixelTolerance: this.nolPixelTolerance,
      source: this.nolSource,
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

    fromEvent<SnapEvent>(this.instance, 'snap')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolSnap.emit(evt);
      });

    this.host.getInstance().addInteraction(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolActive, nolProperties } = changes;

    if (nolActive) {
      this.instance.setActive(nolActive.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeInteraction(this.instance);
  }

}

export function useSnapInteraction(): NolSnapInteractionComponent;
export function useSnapInteraction(options: InjectOptions & {optional?: false}): NolSnapInteractionComponent;
export function useSnapInteraction(options: InjectOptions): NolSnapInteractionComponent | null;
export function useSnapInteraction(options?: InjectOptions): NolSnapInteractionComponent | null  {
  return inject(NolSnapInteractionComponent, options || {}) || null;
}

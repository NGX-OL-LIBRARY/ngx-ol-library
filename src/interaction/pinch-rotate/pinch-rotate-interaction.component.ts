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
import { ObjectEvent } from 'ol/Object';
import BaseEvent from 'ol/events/Event';
import PinchRotate, { Options } from 'ol/interaction/PinchRotate';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component allows the user to rotate the map by twisting with 
 * two fingers on a touch screen.
 * @name nol-pinch-rotate-interaction
 * @order 1
 */
@Component({
  selector: 'nol-pinch-rotate-interaction',
  exportAs: 'nolPinchRotateInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPinchRotateInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {
  
  @Input() nolActive: boolean = true;
  @Input() nolDuration?: number;
  @Input() nolThreshold?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: PinchRotate;

  getInstance(): PinchRotate {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new PinchRotate({
      duration: this.nolDuration,
      threshold: this.nolThreshold
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

export function usePinchRotateInteraction(): NolPinchRotateInteractionComponent;
export function usePinchRotateInteraction(options: InjectOptions & {optional?: false}): NolPinchRotateInteractionComponent;
export function usePinchRotateInteraction(options: InjectOptions): NolPinchRotateInteractionComponent | null;
export function usePinchRotateInteraction(options?: InjectOptions): NolPinchRotateInteractionComponent | null  {
  return inject(NolPinchRotateInteractionComponent, options || {}) || null;
}

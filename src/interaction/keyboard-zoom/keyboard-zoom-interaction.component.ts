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
import { Condition } from 'ol/events/condition';
import BaseEvent from 'ol/events/Event';
import KeyboardZoom, { Options } from 'ol/interaction/KeyboardZoom';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Interaction component that allows the user to zoom the map using keyboard `+` and `-`. 
 * @name nol-keyboard-zoom-interaction
 * @order 1
 */
@Component({
  selector: 'nol-keyboard-zoom-interaction',
  exportAs: 'nolKeyboardZoomInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolKeyboardZoomInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive: boolean = true;
  @Input() nolDuration?: number;
  @Input() nolCondition?: Condition;
  @Input() nolDelta?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: KeyboardZoom;

  getInstance(): KeyboardZoom {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new KeyboardZoom({
      duration: this.nolDuration,
      condition: this.nolCondition,
      delta: this.nolDelta,
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

export function useKeyboardZoomInteraction(): NolKeyboardZoomInteractionComponent;
export function useKeyboardZoomInteraction(options: InjectOptions & {optional?: false}): NolKeyboardZoomInteractionComponent;
export function useKeyboardZoomInteraction(options: InjectOptions): NolKeyboardZoomInteractionComponent | null;
export function useKeyboardZoomInteraction(options?: InjectOptions): NolKeyboardZoomInteractionComponent | null  {
  return inject(NolKeyboardZoomInteractionComponent, options || {}) || null;
}

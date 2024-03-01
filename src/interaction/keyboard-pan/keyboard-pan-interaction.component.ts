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
import KeyboardPan, { Options } from 'ol/interaction/KeyboardPan';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Interaction component that allows the user to pan the map using keyboard arrows. 
 * @name nol-keyboard-pan-interaction
 * @order 1
 */
@Component({
  selector: 'nol-keyboard-pan-interaction',
  exportAs: 'nolKeyboardPanInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolKeyboardPanInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {
  
  @Input() nolActive?: boolean;
  @Input() nolCondition?: Condition;
  @Input() nolDuration?: number;
  @Input() nolPixelDelta?: number;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: KeyboardPan;

  getInstance(): KeyboardPan {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new KeyboardPan({
      condition: this.nolCondition,
      duration: this.nolDuration,
      pixelDelta: this.nolPixelDelta,
    });

    if (typeof this.nolActive === 'boolean') {
      this.instance.setActive(this.nolActive);
    }

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

export function useKeyboardPanInteraction(): NolKeyboardPanInteractionComponent;
export function useKeyboardPanInteraction(options: InjectOptions & {optional?: false}): NolKeyboardPanInteractionComponent;
export function useKeyboardPanInteraction(options: InjectOptions): NolKeyboardPanInteractionComponent | null;
export function useKeyboardPanInteraction(options?: InjectOptions): NolKeyboardPanInteractionComponent | null  {
  return inject(NolKeyboardPanInteractionComponent, options || {}) || null;
}

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
import { AnimationOptions } from 'ol/View';
import BaseEvent from 'ol/events/Event';
import Link, { Options, Params } from 'ol/interaction/Link';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * An interaction component that synchronizes the map state with the URL.
 * @name nol-link-interaction
 * @order 1
 */
@Component({
  selector: 'nol-link-interaction',
  exportAs: 'nolLinkInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLinkInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive?: boolean;
  @Input() nolAnimate?: boolean | AnimationOptions;
  @Input() nolParams?: Params[];
  @Input() nolReplace?: boolean;
  @Input() nolPrefix?: string;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: Link;

  getInstance(): Link {
    return this.instance;
  }

  private prepareInitialOptions(): Options {
    const options: Options = {
      animate: this.nolAnimate,
      replace: this.nolReplace,
      prefix: this.nolPrefix,
    };

    if (this.nolParams) {
      options.params = this.nolParams;
    }

    return options;
  }

  ngOnInit(): void {
    const options = this.prepareInitialOptions();
    
    this.instance = new Link(options);

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

export function useLinkInteraction(): NolLinkInteractionComponent;
export function useLinkInteraction(options: InjectOptions & {optional?: false}): NolLinkInteractionComponent;
export function useLinkInteraction(options: InjectOptions): NolLinkInteractionComponent | null;
export function useLinkInteraction(options?: InjectOptions): NolLinkInteractionComponent | null  {
  return inject(NolLinkInteractionComponent, options || {}) || null;
}
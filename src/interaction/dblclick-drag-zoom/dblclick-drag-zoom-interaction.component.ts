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
import DblClickDragZoom, { Options } from 'ol/interaction/DblClickDragZoom';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * Allows the user to zoom the map by double tap/click then drag up/down with one 
 * finger/left mouse.
 * @name nol-dblclick-drag-zoom-interaction
 * @order 1
 */
@Component({
  selector: 'nol-dblclick-drag-zoom-interaction',
  exportAs: 'nolDblClickDragZoomInteraction',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDblClickDragZoomInteractionComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolActive?: boolean;
  @Input() nolDuration?: number;
  @Input() nolDelta?: number;
  @Input() nolStopDown?: ((arg0: boolean) => boolean);
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolActiveChange = new EventEmitter<boolean>();
  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: DblClickDragZoom;

  getInstance(): DblClickDragZoom {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new DblClickDragZoom({
      duration: this.nolDuration,
      delta: this.nolDelta,
      stopDown: this.nolStopDown
    });

    if (this.nolActive) {
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

export function useDblClickDragZoomInteraction(): NolDblClickDragZoomInteractionComponent;
export function useDblClickDragZoomInteraction(options: InjectOptions & {optional?: false}): NolDblClickDragZoomInteractionComponent;
export function useDblClickDragZoomInteraction(options: InjectOptions): NolDblClickDragZoomInteractionComponent | null;
export function useDblClickDragZoomInteraction(options?: InjectOptions): NolDblClickDragZoomInteractionComponent | null  {
  return inject(NolDblClickDragZoomInteractionComponent, options || {}) || null;
}

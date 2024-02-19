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
import { MapEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { CoordinateFormat } from 'ol/coordinate';
import { ProjectionLike } from 'ol/proj';
import BaseEvent from 'ol/events/Event';
import MousePosition, { Options } from 'ol/control/MousePosition';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A control component to show the 2D coordinates of the mouse cursor.
 * @name nol-mouse-position-control
 * @order 1
 */
@Component({
  selector: 'nol-mouse-position-control',
  exportAs: 'nolMousePositionControl',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMousePositionControlComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolClassName?: string;
  @Input() nolCoordinateFormat?: CoordinateFormat;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolRender?: ((event: MapEvent) => void);
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolPlaceholder?: string;
  @Input() nolWrapX?: boolean;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolCoordinateFormatChange = new EventEmitter<CoordinateFormat>();
  @Output() nolProjectionChange = new EventEmitter<ProjectionLike>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: MousePosition;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new MousePosition({
      className: this.nolClassName,
      coordinateFormat: this.nolCoordinateFormat,
      projection: this.nolProjection,
      render: this.nolRender,
      target: this.nolTarget,
      placeholder: this.nolPlaceholder,
      wrapX: this.nolWrapX,
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:coordinateFormat')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolCoordinateFormat = this.instance.getCoordinateFormat();
        this.nolCoordinateFormatChange.emit(this.nolCoordinateFormat);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:projection')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolProjection = this.instance.getProjection();
        this.nolProjectionChange.emit(this.nolProjection);
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
    
    this.host.getInstance().addControl(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const {
      nolCoordinateFormat,
      nolProjection,
      nolProperties,
      nolTarget,
    } = changes;

    if (nolCoordinateFormat) {
      this.instance.setCoordinateFormat(nolCoordinateFormat.currentValue);
    }

    if (nolProjection) {
      this.instance.setProjection(nolProjection.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }

    if (nolTarget) {
      this.instance.setTarget(nolTarget.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeControl(this.instance);
  }

}

export function useMousePositionControl(): NolMousePositionControlComponent;
export function useMousePositionControl(options: InjectOptions & {optional?: false}): NolMousePositionControlComponent;
export function useMousePositionControl(options: InjectOptions): NolMousePositionControlComponent | null;
export function useMousePositionControl(options?: InjectOptions): NolMousePositionControlComponent | null  {
  return inject(NolMousePositionControlComponent, options || {}) || null;
}

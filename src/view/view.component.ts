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
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import View, { ViewOptions } from 'ol/View';
import BaseEvent from 'ol/events/Event';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * A `nol-view` component represents a simple 2D view of the map.
 * @name nol-view
 * @order 1
 */
@Component({
  selector: 'nol-view',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolViewComponent implements NolPrefixedOptions<ViewOptions>, OnInit, OnChanges, OnDestroy {
  @Input() nolCenter?: Coordinate;
  @Input() nolConstrainRotation?: number | boolean;
  @Input() nolEnableRotation?: boolean;
  @Input() nolExtent?: Extent;
  @Input() nolConstrainOnlyCenter?: boolean;
  @Input() nolSmoothExtentConstraint?: boolean;
  @Input() nolMaxResolution?: number;
  @Input() nolMinResolution?: number;
  @Input() nolMaxZoom?: number;
  @Input() nolMinZoom?: number;
  @Input() nolMultiWorld?: boolean;
  @Input() nolConstrainResolution?: boolean;
  @Input() nolSmoothResolutionConstraint?: boolean;
  @Input() nolShowFullExtent?: boolean;
  @Input() nolProjection?: ProjectionLike;
  @Input() nolResolution?: number;
  @Input() nolResolutions?: number[];
  @Input() nolRotation?: number;
  @Input() nolZoom?: number;
  @Input() nolZoomFactor?: number;
  @Input() nolPadding?: number[];

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolCenterChange = new EventEmitter<Coordinate>();
  @Output() nolResolutionChange = new EventEmitter<number>();
  @Output() nolRotationChange = new EventEmitter<number>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true });
  private instance!: View;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new View({
      center: this.nolCenter,
      constrainRotation: this.nolConstrainRotation,
      enableRotation: this.nolEnableRotation,
      extent: this.nolExtent,
      constrainOnlyCenter: this.nolConstrainOnlyCenter,
      smoothExtentConstraint: this.nolSmoothExtentConstraint,
      maxResolution: this.nolMaxResolution,
      minResolution: this.nolMinResolution,
      maxZoom: this.nolMaxZoom,
      minZoom: this.nolMinZoom,
      multiWorld: this.nolMultiWorld,
      constrainResolution: this.nolConstrainResolution,
      smoothResolutionConstraint: this.nolSmoothResolutionConstraint,
      showFullExtent: this.nolShowFullExtent,
      projection: this.nolProjection,
      resolution: this.nolResolution,
      resolutions: this.nolResolutions,
      rotation: this.nolRotation,
      zoom: this.nolZoom,
      zoomFactor: this.nolZoomFactor,
      padding: this.nolPadding,
    });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:center')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolCenter = this.instance.getCenter();
        this.nolCenterChange.emit(this.nolCenter);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:resolution')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolResolution = this.instance.getResolution();
        this.nolResolutionChange.emit(this.nolResolution);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:rotation')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolRotation = this.instance.getRotation();
        this.nolRotationChange.emit(this.nolRotation);
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

    this.host.getInstance().setView(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    const {
      nolCenter,
      nolConstrainResolution,
      nolMaxZoom,
      nolMinZoom,
      nolResolution,
      nolRotation,
      nolZoom,
    } = changes;

    if (nolCenter) {
      this.instance.setCenter(nolCenter.currentValue);
    }

    if (nolConstrainResolution) {
      this.instance.setConstrainResolution(nolConstrainResolution.currentValue);
    }

    if (nolMaxZoom) {
      this.instance.setMaxZoom(nolMaxZoom.currentValue);
    }

    if (nolMinZoom) {
      this.instance.setMinZoom(nolMinZoom.currentValue);
    }

    if (nolResolution) {
      this.instance.setResolution(nolResolution.currentValue);
    }

    if (nolRotation) {
      this.instance.setRotation(nolRotation.currentValue);
    }

    if (nolZoom) {
      this.instance.setZoom(nolZoom.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.getInstance().setView(null as NolSafeAny);
  }

}

export function injectView(): NolViewComponent;
export function injectView(options: InjectOptions & {optional?: false}): NolViewComponent;
export function injectView(options: InjectOptions): NolViewComponent | null;
export function injectView(options?: InjectOptions): NolViewComponent | null  {
  return inject(NolViewComponent, options || {}) || null;
}
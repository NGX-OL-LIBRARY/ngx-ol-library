import {
  ChangeDetectionStrategy,
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
import { debounceTime, fromEvent } from 'rxjs';
import { Collection } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import { LineString, MultiLineString } from 'ol/geom';
import { GeometryLayout } from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import { NolSafeAny } from 'ngx-ol-library/core';
import { injectGeometryHost } from 'ngx-ol-library/geom/core';

/**
 * Multi-linestring geometry component.
 * @name nol-multi-line-string-geometry
 * @order 1
 */
@Component({
  selector: 'nol-multi-line-string-geometry',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMultiLineStringGeometryComponent implements OnInit, OnChanges, OnDestroy {

  @Input() nolCoordinates!: (Coordinate[] | LineString)[] | number[];
  @Input() nolLayout?: GeometryLayout;
  @Input() nolEnds?: number[];
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectGeometryHost('nol-multi-line-string-geometry');
  private readonly lineStrings = new Collection<LineString>();
  private initialCoordinates: Coordinate[][] = [];
  private instance!: MultiLineString;

  getInstance() {
    return this.instance;
  }

  changed(): void {
    const coordinates = this.lineStrings
      .getArray()
      .map(item => item.getCoordinates());
    this.instance.setCoordinates([
      ...this.initialCoordinates,
      ...coordinates,
    ]);
    this.host.changed();
  }

  addLineString(lineString: LineString): number {
    return this.lineStrings.push(lineString);
  }

  removeLineString(lineString: LineString): LineString | undefined {
    return this.lineStrings.remove(lineString);
  }

  ngOnInit(): void {
    if (typeof this.nolCoordinates[0] === 'number') {
      this.checkEndsAndLayout();
    }

    this.instance = new MultiLineString(
      this.nolCoordinates,
      this.nolLayout,
      this.nolEnds,
    );

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    this.initialCoordinates = this.instance.getCoordinates();

    fromEvent(this.lineStrings, 'change:length')
      .pipe(
        debounceTime(10),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.changed();
      });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
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
    
    this.host.addGeometry(this.instance);
  }

  ngOnChanges({ nolCoordinates, nolProperties }: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    if (nolCoordinates) {
      this.setCoordinates(nolCoordinates.currentValue);
      this.initialCoordinates = this.instance.getCoordinates();
      this.changed();
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeGeometry(this.instance);
  }

  private setCoordinates(coordinates: Coordinate[][] | number[]): void {
    if (typeof coordinates[0] === 'number') {
      this.checkEndsAndLayout();
      
      this.instance.setFlatCoordinates(
        this.nolLayout as GeometryLayout, 
        coordinates as number[]
      );
      this.instance['ends_'] = this.nolEnds;
      this.instance.changed();
    } else {
      this.instance.setCoordinates(
        coordinates as Coordinate[][], 
        this.nolLayout
      );
    }
  }

  private checkEndsAndLayout(): void {
    if (this.nolEnds === undefined || this.nolLayout === undefined) {
      throw new Error(
        `[NolMultiLineStringGeometryComponent] Flat coordinates must have ` +
        `nolLayout and nolEnds properties set.`
      );
    }
  }
  
}

export function injectMultiLineStringGeometry(): NolMultiLineStringGeometryComponent;
export function injectMultiLineStringGeometry(options: InjectOptions & {optional?: false}): NolMultiLineStringGeometryComponent;
export function injectMultiLineStringGeometry(options: InjectOptions): NolMultiLineStringGeometryComponent | null;
export function injectMultiLineStringGeometry(options?: InjectOptions): NolMultiLineStringGeometryComponent | null  {
  return inject(NolMultiLineStringGeometryComponent, options || {}) || null;
}
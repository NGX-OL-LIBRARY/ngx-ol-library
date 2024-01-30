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
import { fromEvent } from 'rxjs';
import { ObjectEvent } from 'ol/Object';
import { NearestDirectionFunction } from 'ol/array';
import { AttributionLike } from 'ol/source/Source';
import { Config } from 'ol/source/TileJSON';
import BaseEvent from 'ol/events/Event';
import UTFGrid, { Options } from 'ol/source/UTFGrid';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { useTileSourceHost } from 'ngx-ol-library/source/core';

/**
 * Layer source component for UTFGrid interaction data loaded from TileJSON format.
 * @name nol-utfgrid-source
 * @order 1
 */
@Component({
  selector: 'nol-utfgrid-source',
  exportAs: 'nolUTFGridSource',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolUTFGridSourceComponent implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAttributions?: AttributionLike;
  @Input() nolPreemptive?: boolean;
  @Input() nolJsonp?: boolean;
  @Input() nolTileJSON?: Config;
  @Input() nolUrl?: string;
  @Input() nolZDirection?: number | NearestDirectionFunction;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = useTileSourceHost('nol-utfgrid-source');
  private instance!: UTFGrid;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new UTFGrid({
      preemptive: this.nolPreemptive,
      jsonp: this.nolJsonp,
      tileJSON: this.nolTileJSON,
      url: this.nolUrl,
      zDirection: this.nolZDirection,
    });

    if (this.nolAttributions) {
      this.instance.setAttributions(this.nolAttributions);
    }

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

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

    this.host.addSource(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolAttributions, nolProperties } = changes;

    if (nolAttributions) {
      this.instance.setAttributions(nolAttributions.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.host.removeSource(this.instance);
  }

}

export function useUTFGridSource(): NolUTFGridSourceComponent;
export function useUTFGridSource(options: InjectOptions & {optional?: false}): NolUTFGridSourceComponent;
export function useUTFGridSource(options: InjectOptions): NolUTFGridSourceComponent | null;
export function useUTFGridSource(options?: InjectOptions): NolUTFGridSourceComponent | null  {
  return inject(NolUTFGridSourceComponent, options || {}) || null;
}
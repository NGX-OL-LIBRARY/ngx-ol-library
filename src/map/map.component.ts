import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
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
import Collection from 'ol/Collection';
import Map, { MapOptions } from 'ol/Map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import MapEvent from 'ol/MapEvent';
import Overlay from 'ol/Overlay';
import View, { ViewOptions } from 'ol/View';
import Control from 'ol/control/Control';
import BaseEvent from 'ol/events/Event';
import Interaction from 'ol/interaction/Interaction';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import RenderEvent from 'ol/render/Event';
import { NolPrefixedOptions } from 'ngx-ol-library/core';

/**
 * This is the main container for all other ngx-ol-library components.
 * @name nol-map
 * @order 1
 */
@Component({
  selector: 'nol-map',
  standalone: true,
  template: `
    <div
      [tabIndex]="nolTabIndex"
      [style.width.%]="100"
      [style.height.%]="100"
      [style.position]="'relative'"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMapComponent implements NolPrefixedOptions<MapOptions>, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() nolControls?: Collection<Control> | Control[];
  @Input() nolPixelRatio?: number;
  @Input() nolInteractions?: Collection<Interaction> | Interaction[];
  @Input() nolKeyboardEventTarget?: string | Document | HTMLElement;
  @Input() nolLayers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup;
  @Input() nolMaxTilesLoading?: number;
  @Input() nolMoveTolerance?: number;
  @Input() nolOverlays?: Collection<Overlay> | Overlay[];
  @Input() nolTarget?: string | HTMLElement;
  @Input() nolView?: View | Promise<ViewOptions>;
  @Input() nolTabIndex?: number;
  @Input() @HostBinding('style.width') nolWidth: string | number = '100%';
  @Input() @HostBinding('style.height') nolHeight: string | number = '100%';

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolLayerGroupChange = new EventEmitter<ObjectEvent>();
  @Output() nolSizeChange = new EventEmitter<ObjectEvent>();
  @Output() nolTargetChange = new EventEmitter<string|HTMLElement>();
  @Output() nolViewChange = new EventEmitter<View>();
  @Output() nolClick = new EventEmitter<MapBrowserEvent<PointerEvent>>();
  @Output() nolDblclick = new EventEmitter<MapBrowserEvent<PointerEvent>>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolLoadend = new EventEmitter<MapEvent>();
  @Output() nolLoadstart = new EventEmitter<MapEvent>();
  @Output() nolMoveend = new EventEmitter<MapEvent>();
  @Output() nolMovestart = new EventEmitter<MapEvent>();
  @Output() nolPointerdrag = new EventEmitter<MapBrowserEvent<PointerEvent>>();
  @Output() nolPointermove = new EventEmitter<MapBrowserEvent<PointerEvent>>();
  @Output() nolPostcompose = new EventEmitter<RenderEvent>();
  @Output() nolPostrender = new EventEmitter<MapEvent>();
  @Output() nolPrecompose = new EventEmitter<RenderEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();
  @Output() nolRendercomplete = new EventEmitter<RenderEvent>();
  @Output() nolSingleclick = new EventEmitter<MapBrowserEvent<PointerEvent>>();

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private instance!: Map;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Map({
      controls: this.nolControls,
      pixelRatio: this.nolPixelRatio,
      interactions: this.nolInteractions,
      keyboardEventTarget: this.nolKeyboardEventTarget,
      layers: this.nolLayers,
      maxTilesLoading: this.nolMaxTilesLoading,
      moveTolerance: this.nolMoveTolerance,
      overlays: this.nolOverlays,
      view: this.nolView,
    });

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:layerGroup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolLayerGroupChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:size')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolSizeChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:target')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolTarget = this.instance.getTarget();
        this.nolTargetChange.emit(this.nolTarget);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:view')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolView = this.instance.getView();
        this.nolViewChange.emit(this.nolView);
        this.cdr.markForCheck();
      });

    fromEvent<MapBrowserEvent<PointerEvent>>(this.instance, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolClick.emit(evt);
      });

    fromEvent<MapBrowserEvent<PointerEvent>>(this.instance, 'dblclick')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolDblclick.emit(evt);
      });

    fromEvent<BaseEvent>(this.instance, 'error')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolError.emit(evt);
      });

    fromEvent<MapEvent>(this.instance, 'loadend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolLoadend.emit(evt);
      });

    fromEvent<MapEvent>(this.instance, 'loadstart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolLoadstart.emit(evt);
      });

    fromEvent<MapEvent>(this.instance, 'moveend')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolMoveend.emit(evt);
      });

    fromEvent<MapEvent>(this.instance, 'movestart')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolMovestart.emit(evt);
      });

    fromEvent<MapBrowserEvent<PointerEvent>>(this.instance, 'pointerdrag')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPointerdrag.emit(evt);
      });

    fromEvent<MapBrowserEvent<PointerEvent>>(this.instance, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPointermove.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'postcompose')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPostcompose.emit(evt);
      });

    fromEvent<MapEvent>(this.instance, 'postrender')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPostrender.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'precompose')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPrecompose.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'propertychange')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolPropertychange.emit(evt);
      });

    fromEvent<RenderEvent>(this.instance, 'rendercomplete')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolRendercomplete.emit(evt);
      });

    fromEvent<MapBrowserEvent<PointerEvent>>(this.instance, 'singleclick')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolSingleclick.emit(evt);
      });
  }

  ngAfterViewInit(): void {
    if (!this.nolTarget) {
      this.nolTarget = this.elementRef.nativeElement.firstChild as HTMLElement;
    }
    this.instance.setTarget(this.nolTarget);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { nolLayers, nolTarget, nolView } = changes;

    if (nolLayers) {
      this.instance.setLayers(nolLayers.currentValue);
    }

    if (nolTarget) {
      this.instance.setTarget(nolTarget.currentValue);
    }

    if (nolView) {
      this.instance.setView(nolView.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.instance.dispose();
  }

}

export function injectMap(): NolMapComponent;
export function injectMap(options: InjectOptions & {optional?: false}): NolMapComponent;
export function injectMap(options: InjectOptions): NolMapComponent | null;
export function injectMap(options?: InjectOptions): NolMapComponent | null  {
  return inject(NolMapComponent, options || {}) || null;
}
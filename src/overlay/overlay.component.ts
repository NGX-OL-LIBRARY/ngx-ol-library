import {
  AfterViewInit,
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
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PortalModule, DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { fromEvent } from 'rxjs';
import { Map } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { Coordinate } from 'ol/coordinate';
import BaseEvent from 'ol/events/Event';
import Overlay, { Options, PanIntoViewOptions, Positioning } from 'ol/Overlay';
import { NolPrefixedOptions, NolSafeAny } from 'ngx-ol-library/core';
import { injectMap } from 'ngx-ol-library/map';

/**
 * `nol-overlay` component creates a HTML element that would be displayed over the 
 * map and attached to a single map location.
 * @name nol-overlay
 * @order 1
 */
@Component({
  selector: 'nol-overlay',
  exportAs: 'nolOverlay',
  standalone: true,
  imports: [PortalModule],
  template: `
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOverlayComponent implements NolPrefixedOptions<Options>, OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input() nolId?: string | number;
  @Input() nolElement?: HTMLElement;
  @Input() nolOffset?: number[];
  @Input() nolPosition?: Coordinate;
  @Input() nolPositioning?: Positioning;
  @Input() nolStopEvent?: boolean;
  @Input() nolInsertFirst?: boolean;
  @Input() nolAutoPan?: boolean | PanIntoViewOptions;
  @Input() nolClassName?: string;
  @Input() nolMap?: Map;
  @Input() nolProperties?: Record<string, NolSafeAny>;

  @Output() nolChange = new EventEmitter<BaseEvent>();
  @Output() nolElementChange = new EventEmitter<HTMLElement>();
  @Output() nolMapChange = new EventEmitter<Map | undefined>();
  @Output() nolOffsetChange = new EventEmitter<number[]>();
  @Output() nolPositionChange = new EventEmitter<Coordinate | undefined>();
  @Output() nolPositioningChange = new EventEmitter<Positioning>();
  @Output() nolError = new EventEmitter<BaseEvent>();
  @Output() nolPropertychange = new EventEmitter<ObjectEvent>();

  @ViewChild('content', { read: TemplateRef }) readonly content!: TemplateRef<void>;

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = injectMap({ host: true, optional: true });
  private contentOutlet?: DomPortalOutlet;
  private contentPortal?: TemplatePortal;
  private instance!: Overlay;

  ngOnInit(): void {
    if (!this.nolElement) {
      this.nolElement = document.createElement('div');
    }

    this.setOutletElement(this.nolElement);

    this.instance = new Overlay({
      id: this.nolId,
      element: this.nolElement,
      offset: this.nolOffset,
      position: this.nolPosition,
      positioning: this.nolPositioning,
      stopEvent: this.nolStopEvent,
      insertFirst: this.nolInsertFirst,
      autoPan: this.nolAutoPan,
      className: this.nolClassName,
    });

    if (this.nolProperties) {
      this.instance.setProperties(this.nolProperties);
    }

    fromEvent<BaseEvent>(this.instance, 'change')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(evt => {
        this.nolChange.emit(evt);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:element')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolElement = this.instance.getElement();
        this.nolElementChange.emit(this.nolElement);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:map')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolMap = this.instance.getMap() ?? undefined;
        this.nolMapChange.emit(this.nolMap);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:offset')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolOffset = this.instance.getOffset();
        this.nolOffsetChange.emit(this.nolOffset);
        this.cdr.markForCheck();
      });

    fromEvent<ObjectEvent>(this.instance, 'change:position')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolPosition = this.instance.getPosition();
        this.nolPositionChange.emit(this.nolPosition);
      });

    fromEvent<ObjectEvent>(this.instance, 'change:positioning')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.nolPositioning = this.instance.getPositioning();
        this.nolPositioningChange.emit(this.nolPositioning);
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

    if (this.nolMap) {
      this.instance.setMap(this.nolMap);
    } else if (this.host) {
      this.host.getInstance().addOverlay(this.instance);
    } else {
      throw new Error(
        '`nol-overlay` component must be nested within a `nol-map` component, or ' +
        'must be set `nolMap` property to display the overlay over the map.'
      );
    }
  }

  ngAfterViewInit(): void {
    this.contentPortal = new TemplatePortal(this.content, this.viewContainerRef);
    this.contentOutlet?.attachTemplatePortal(this.contentPortal);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { 
      nolElement,
      nolOffset,
      nolPosition,
      nolPositioning,
      nolProperties,
    } = changes;

    if (nolElement) {
      this.setOutletElement(nolElement.currentValue);
      this.instance.setElement(nolElement.currentValue);
    }

    if (nolOffset) {
      this.instance.setOffset(nolOffset.currentValue);
    }

    if (nolPosition) {
      this.instance.setPosition(nolPosition.currentValue);
    }

    if (nolPositioning) {
      this.instance.setPositioning(nolPositioning.currentValue);
    }

    if (nolProperties) {
      this.instance.setProperties(nolProperties.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.contentOutlet?.dispose();
    if (this.host) {
      this.host.getInstance().removeOverlay(this.instance);
    }
  }

  private setOutletElement(element: HTMLElement): void {
    if (this.contentOutlet) {
      this.contentOutlet.dispose();
    }

    this.contentOutlet = new DomPortalOutlet(element);

    if (this.contentPortal) {
      this.contentOutlet.attachTemplatePortal(this.contentPortal);
    }
  }
}

export function useOverlay(): NolOverlayComponent;
export function useOverlay(options: InjectOptions & {optional?: false}): NolOverlayComponent;
export function useOverlay(options: InjectOptions): NolOverlayComponent | null;
export function useOverlay(options?: InjectOptions): NolOverlayComponent | null  {
  return inject(NolOverlayComponent, options || {}) || null;
}
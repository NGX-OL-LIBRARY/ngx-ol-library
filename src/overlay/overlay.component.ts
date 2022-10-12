import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { NolMapComponent } from 'ngx-ol-library/map';
import { Coordinate } from 'ol/coordinate';
import { ObjectEvent } from 'ol/Object';
import Overlay, { Options, PanIntoViewOptions, Positioning } from 'ol/Overlay';
import { NolOverlayContentDirective } from './overlay-content.directive';

@Component({
  selector: 'nol-overlay',
  exportAs: 'nolOverlay',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolOverlayComponent extends NolBaseObjectComponent<Overlay> implements AfterViewInit, OnChanges, OnDestroy, Options {

  @ContentChild(NolOverlayContentDirective, { static: true, read: TemplateRef }) content!: TemplateRef<{}>;

  @Input() id?: string | number;
  @Input() element?: HTMLElement;
  @Input() offset?: number[];
  @Input() position?: Coordinate;
  @Input() positioning?: Positioning;
  @Input() stopEvent?: boolean;
  @Input() insertFirst?: boolean;
  @Input() autoPan?: boolean | PanIntoViewOptions;
  @Input() className?: string;

  @Output() onElementChange = new EventEmitter<ObjectEvent>();
  @Output() onMapChange = new EventEmitter<ObjectEvent>();
  @Output() onOffsetChange = new EventEmitter<ObjectEvent>();
  @Output() onPositionChange = new EventEmitter<ObjectEvent>();
  @Output() onPositioningChange = new EventEmitter<ObjectEvent>();

  private overlayOutlet?: DomPortalOutlet;

  constructor(
    protected viewContainerRef: ViewContainerRef,
    protected host: NolMapComponent
  ) { 
    super();
  }

  override ngOnInit(): void {}

  override ngOnChanges(changes: SimpleChanges): void {
    const { element, offset, position, positioning, ...restChanges } = changes;
    if (this.instance && element) {
      this.instance.setElement(element.currentValue);
    }
    if (this.instance && offset) {
      this.instance.setOffset(offset.currentValue);
    }
    if (this.instance && position) {
      this.instance.setPosition(position.currentValue);
    }
    if (this.instance && positioning) {
      this.instance.setPositioning(positioning.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngAfterViewInit(): void {
    const portal = new TemplatePortal(this.content, this.viewContainerRef);
    if (!this.element) {
      this.element = document.createElement('div');
    }
    this.overlayOutlet = new DomPortalOutlet(this.element);
    this.overlayOutlet.attach(portal);

    this.instance = new Overlay(this);
    this.instance.on('change:element', (event: ObjectEvent) => this.onElementChange.emit(event));
    this.instance.on('change:map', (event: ObjectEvent) => this.onMapChange.emit(event));
    this.instance.on('change:offset', (event: ObjectEvent) => this.onOffsetChange.emit(event));
    this.instance.on('change:position', (event: ObjectEvent) => this.onPositionChange.emit(event));
    this.instance.on('change:positioning', (event: ObjectEvent) => this.onPositioningChange.emit(event));

    super.ngOnInit();
    this.host.instance.addOverlay(this.instance);
  }

  ngOnDestroy(): void {
    this.host.instance.removeOverlay(this.instance);
    this.overlayOutlet?.dispose();
  }

}

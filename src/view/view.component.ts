import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  Output, 
  SimpleChanges, 
  ViewEncapsulation 
} from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj';
import View, { AnimationOptions, ViewOptions } from 'ol/View';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { NolMapComponent } from 'ngx-ol-library/map';

@Component({
  selector: 'nol-view',
  exportAs: 'nolView',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolViewComponent extends NolBaseObjectComponent<View> implements OnInit, OnChanges, OnDestroy, ViewOptions {

  @Input() center?: Coordinate;
  @Input() constrainRotation?: number | boolean;
  @Input() enableRotation?: boolean;
  @Input() extent?: Extent;
  @Input() constrainOnlyCenter?: boolean;
  @Input() smoothExtentConstraint?: boolean;
  @Input() maxResolution?: number;
  @Input() minResolution?: number;
  @Input() maxZoom?: number;
  @Input() minZoom?: number;
  @Input() multiWorld?: boolean;
  @Input() constrainResolution?: boolean;
  @Input() smoothResolutionConstraint?: boolean;
  @Input() showFullExtent?: boolean;
  @Input() projection?: ProjectionLike;
  @Input() resolution?: number;
  @Input() resolutions?: number[];
  @Input() rotation?: number;
  @Input() zoom?: number;
  @Input() zoomFactor?: number;
  @Input() padding?: number[];
  @Input() enableChangesAnimation: boolean = false;

  @Output() onCenterChange = new EventEmitter<ObjectEvent>();
  @Output() onResolutionChange = new EventEmitter<ObjectEvent>();
  @Output() onRotationChange = new EventEmitter<ObjectEvent>();

  constructor(protected host: NolMapComponent) { 
    super();
  }

  override ngOnInit(): void {
    this.instance = new View(this);
    this.instance.on('change:center', (event: ObjectEvent) => this.onCenterChange.emit(event));
    this.instance.on('change:resolution', (event: ObjectEvent) => this.onResolutionChange.emit(event));
    this.instance.on('change:rotation', (event: ObjectEvent) => this.onRotationChange.emit(event));
    super.ngOnInit();
    this.host.instance.setView(this.instance);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { center, constrainResolution, maxZoom, minZoom, resolution, rotation, zoom, ...restChanges } = changes;
    const animation: AnimationOptions = {};

    if (this.instance && center) {
      if (this.enableChangesAnimation) {
        animation.center = center.currentValue;
      } else {
        this.instance.setCenter(center.currentValue);
      }
    }
    if (this.instance && constrainResolution) {
      this.instance.setConstrainResolution(constrainResolution.currentValue);
    }
    if (this.instance && maxZoom) {
      this.instance.setMaxZoom(maxZoom.currentValue);
    }
    if (this.instance && minZoom) {
      this.instance.setMinZoom(minZoom.currentValue);
    }
    if (this.instance && resolution) {
      if (this.enableChangesAnimation) {
        animation.resolution = resolution.currentValue;
      } else {
        this.instance.setResolution(resolution.currentValue);
      }
    }
    if (this.instance && rotation) {
      if (this.enableChangesAnimation) {
        animation.rotation = rotation.currentValue;
      } else {
        this.instance.setRotation(rotation.currentValue);
      }
    }
    if (this.instance && zoom) {
      if (this.enableChangesAnimation) {
        animation.zoom = zoom.currentValue;
      } else {
        this.instance.setZoom(zoom.currentValue);
      }
    }
    super.ngOnChanges(restChanges);
    if (this.enableChangesAnimation && Object.keys(animation).length > 0) {
      this.instance.animate(animation);
    }
  }

  ngOnDestroy(): void {
    this.host.instance.setView(undefined as any);
  }

}

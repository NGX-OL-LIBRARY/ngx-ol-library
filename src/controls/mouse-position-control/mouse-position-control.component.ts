import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/controls/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import MousePosition, { Options } from 'ol/control/MousePosition';
import { CoordinateFormat } from 'ol/coordinate';
import { ObjectEvent } from 'ol/Object';
import { ProjectionLike } from 'ol/proj';

@Component({
  selector: 'nol-mouse-position-control',
  exportAs: 'nolMousePositionControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolMousePositionControlComponent extends NolControlComponent<MousePosition> implements OnInit, OnChanges, Options {

  @Input() className?: string;
  @Input() coordinateFormat?: CoordinateFormat;
  @Input() projection?: ProjectionLike;
  @Input() placeholder?: string;

  @Output() onCoordinateFormatChange = new EventEmitter<ObjectEvent>();
  @Output() onProjectionChange = new EventEmitter<ObjectEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new MousePosition(this);
    this.instance.on('change:coordinateFormat', (event: ObjectEvent) => this.onCoordinateFormatChange.emit(event));
    this.instance.on('change:projection', (event: ObjectEvent) => this.onProjectionChange.emit(event));
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { coordinateFormat, projection, ...restChanges } = changes;
    if (this.instance && coordinateFormat) {
      this.instance.setCoordinateFormat(coordinateFormat.currentValue);
    }
    if (this.instance && projection) {
      this.instance.setProjection(projection.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interactions/interaction';
import FeatureFormat from 'ol/format/Feature';
import { Geometry } from 'ol/geom';
import DragAndDrop, { DragAndDropEvent, Options } from 'ol/interaction/DragAndDrop';
import { ProjectionLike } from 'ol/proj';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'nol-drag-and-drop-interaction',
  exportAs: 'nolDragAndDropInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragAndDropInteractionComponent extends NolInteractionComponent<DragAndDrop> implements OnInit, Options {

  @Input() formatConstructors?: (FeatureFormat | typeof FeatureFormat)[];
  @Input() source?: VectorSource<Geometry>
  @Input() projection?: ProjectionLike;
  @Input() target?: HTMLElement;

  @Output() onAddfeatures = new EventEmitter<DragAndDropEvent>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DragAndDrop(this);
    this.instance.on('addfeatures', (event: DragAndDropEvent) => this.onAddfeatures.emit(event));
    super.ngOnInit();
  }

}

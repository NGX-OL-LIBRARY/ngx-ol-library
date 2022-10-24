import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolDragBoxInteractionComponent } from 'ngx-ol-library/interaction/drag-box';
import DragZoom, { Options } from 'ol/interaction/DragZoom';

@Component({
  selector: 'nol-drag-zoom-interaction',
  exportAs: 'nolDragZoomInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolDragZoomInteractionComponent extends NolDragBoxInteractionComponent<DragZoom> implements OnInit, Options {

  @Input() duration?: number;
  @Input() out?: boolean;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new DragZoom(this);
    super.ngOnInit();
  }

}

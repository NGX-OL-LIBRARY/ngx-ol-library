import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/controls/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import ZoomToExtent, { Options } from 'ol/control/ZoomToExtent';
import { Extent } from 'ol/extent';

@Component({
  selector: 'nol-zoom-to-extent-control',
  exportAs: 'nolZoomToExtentControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomToExtentControlComponent extends NolControlComponent<ZoomToExtent> implements OnInit, Options {

  @Input() className?: string;
  @Input() label?: string | HTMLElement;
  @Input() tipLabel?: string;
  @Input() extent?: Extent;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new ZoomToExtent(this);
    super.ngOnInit();
  }

}

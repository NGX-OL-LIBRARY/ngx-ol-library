import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/control/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import Zoom, { Options } from 'ol/control/Zoom';

@Component({
  selector: 'nol-zoom-control',
  exportAs: 'nolZoomControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomControlComponent extends NolControlComponent<Zoom> implements OnInit, Options {

  @Input() duration?: number;
  @Input() className?: string;
  @Input() zoomInClassName?: string;
  @Input() zoomOutClassName?: string;
  @Input() zoomInLabel?: string | HTMLElement;
  @Input() zoomOutLabel?: string | HTMLElement;
  @Input() zoomInTipLabel?: string;
  @Input() zoomOutTipLabel?: string;
  @Input() delta?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Zoom(this);
    super.ngOnInit();
  }

}

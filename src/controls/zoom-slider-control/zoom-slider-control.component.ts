import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/controls/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import ZoomSlider, { Options } from 'ol/control/ZoomSlider';

@Component({
  selector: 'nol-zoom-slider-control',
  exportAs: 'nolZoomSliderControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolZoomSliderControlComponent extends NolControlComponent<ZoomSlider> implements OnInit, Options {

  @Input() className?: string;
  @Input() duration?: number;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new ZoomSlider(this);
    super.ngOnInit();
  }

}

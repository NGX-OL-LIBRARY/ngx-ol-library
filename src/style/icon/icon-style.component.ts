import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolImageStyleComponent } from 'ngx-ol-library/style/image';
import { NolStyleComponent } from 'ngx-ol-library/style/style';
import { Color } from 'ol/color';
import { Size } from 'ol/size.js';
import Icon, { IconAnchorUnits, IconOrigin, Options } from 'ol/style/Icon';

@Component({
  selector: 'nol-icon-style',
  exportAs: 'nolIconStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolIconStyleComponent extends NolImageStyleComponent<Icon> implements OnInit, OnChanges, Options {

  @Input() anchor?: number[];
  @Input() anchorOrigin?: IconOrigin;
  @Input() anchorXUnits?: IconAnchorUnits;
  @Input() anchorYUnits?: IconAnchorUnits;
  @Input() color?: string | Color;
  @Input() crossOrigin?: string | null;
  @Input() img?: HTMLCanvasElement | HTMLImageElement;
  @Input() imgSize?: Size;
  @Input() offset?: number[];
  @Input() offsetOrigin?: IconOrigin;
  @Input() size?: Size;
  @Input() src?: string;

  constructor(styleHost: NolStyleComponent) { 
    super(styleHost);
  }

  override ngOnInit(): void {
    this.instance = new Icon(this);
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { anchor, ...restChanges } = changes;
    if (this.instance && anchor) {
      this.instance.setAnchor(anchor.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

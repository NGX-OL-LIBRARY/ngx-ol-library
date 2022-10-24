import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolCircleStyleComponent } from 'ngx-ol-library/style/circle';
import { NolRegularShapeStyleComponent } from 'ngx-ol-library/style/regular-shape';
import { NolStyleComponent } from 'ngx-ol-library/style/style';
import { NolTextStyleComponent } from 'ngx-ol-library/style/text';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import Fill, { Options } from 'ol/style/Fill';

@Component({
  selector: 'nol-fill-style',
  exportAs: 'nolFillStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolFillStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input() color?: Color | ColorLike | null;
  @Input() isBackgroundFill?: boolean;

  public instance!: Fill;
  protected host?: NolStyleComponent | NolCircleStyleComponent | NolRegularShapeStyleComponent | NolTextStyleComponent;

  constructor(
    @Optional() @Host() styleHost?: NolStyleComponent,
    @Optional() @Host() circleStyleHost?: NolCircleStyleComponent,
    @Optional() @Host() regularShapeStyleHost?: NolRegularShapeStyleComponent,
    @Optional() @Host() textStyleHost?: NolTextStyleComponent
  ) { 
    this.host = textStyleHost || regularShapeStyleHost || circleStyleHost || styleHost;
    if (!this.host) {
      throw new Error(`nol-fill-style must be nested in a Style, CircleStyle, RegularShapeStyle or TextStyle component.`);
    }
  }

  ngOnInit(): void {
    this.instance = new Fill(this);
    if (this.isBackgroundFill && this.host instanceof NolTextStyleComponent) {
      this.host.instance.setBackgroundFill(this.instance);
    } else {
      this.host?.instance.setFill(this.instance);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { color } = changes;
    if (this.instance && color) {
      this.instance.setColor(color.currentValue);
    }
    this.host?.update();
  }

  ngOnDestroy(): void {
    if (this.isBackgroundFill && this.host instanceof NolTextStyleComponent) {
      this.host.instance.setBackgroundFill(undefined as any);
    } else {
      this.host?.instance.setFill(undefined as any);
    }
  }

}

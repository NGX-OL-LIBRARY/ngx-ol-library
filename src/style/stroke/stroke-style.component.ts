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
import Stroke, { Options } from 'ol/style/Stroke';

@Component({
  selector: 'nol-stroke-style',
  exportAs: 'nolStrokeStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStrokeStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input() color?: Color | ColorLike;
  @Input() lineCap?: CanvasLineCap;
  @Input() lineJoin?: CanvasLineJoin;
  @Input() lineDash?: number[];
  @Input() lineDashOffset?: number;
  @Input() miterLimit?: number;
  @Input() width?: number;
  @Input() isBackgroundStroke?: boolean;

  public instance!: Stroke;
  protected host?: NolStyleComponent | NolCircleStyleComponent | NolRegularShapeStyleComponent | NolTextStyleComponent;

  constructor(
    @Optional() @Host() styleHost?: NolStyleComponent,
    @Optional() @Host() circleStyleHost?: NolCircleStyleComponent,
    @Optional() @Host() regularShapeStyleHost?: NolRegularShapeStyleComponent,
    @Optional() @Host() textStyleHost?: NolTextStyleComponent
  ) { 
    this.host = textStyleHost || regularShapeStyleHost || circleStyleHost || styleHost;
    if (!this.host) {
      throw new Error(`nol-stroke-style must be nested in a Style, CircleStyle, RegularShapeStyle or TextStyle component.`);
    }
  }

  ngOnInit(): void {
    this.instance = new Stroke(this);
    if (this.isBackgroundStroke && this.host instanceof NolTextStyleComponent) {
      this.host.instance.setBackgroundStroke(this.instance);
    } else {
      this.host?.instance.setStroke(this.instance);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    const { color, lineCap, lineDash, lineDashOffset, lineJoin, miterLimit, width } = changes;
    if (color) {
      this.instance.setColor(color.currentValue);
    }
    if (lineCap) {
      this.instance.setLineCap(lineCap.currentValue);
    }
    if (lineDash) {
      this.instance.setLineDash(lineDash.currentValue);
    }
    if (lineDashOffset) {
      this.instance.setLineDashOffset(lineDashOffset.currentValue);
    }
    if (lineJoin) {
      this.instance.setLineJoin(lineJoin.currentValue);
    }
    if (miterLimit) {
      this.instance.setMiterLimit(miterLimit.currentValue);
    }
    if (width) {
      this.instance.setWidth(width.currentValue);
    }
    this.host?.update();
  }

  ngOnDestroy(): void {
    if (this.isBackgroundStroke && this.host instanceof NolTextStyleComponent) {
      this.host.instance.setBackgroundStroke(undefined as any);
    } else {
      this.host?.instance.setStroke(undefined as any);
    }
  }

}

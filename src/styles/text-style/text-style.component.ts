import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolStyleComponent } from 'ngx-ol-library/styles/style';
import { Size } from 'ol/size';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text, { Options, TextJustify, TextPlacement } from 'ol/style/Text';

@Component({
  selector: 'nol-text-style',
  exportAs: 'nolTextStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTextStyleComponent implements OnInit, OnChanges, OnDestroy, Options {

  @Input() font?: string;
  @Input() maxAngle?: number;
  @Input() offsetX?: number;
  @Input() offsetY?: number;
  @Input() overflow?: boolean;
  @Input() placement?: TextPlacement;
  @Input() scale?: number | Size;
  @Input() rotateWithView?: boolean;
  @Input() rotation?: number;
  @Input() text?: string | string[];
  @Input() textAlign?: CanvasTextAlign;
  @Input() justify?: TextJustify;
  @Input() textBaseline?: CanvasTextBaseline;
  @Input() fill?: Fill;
  @Input() stroke?: Stroke;
  @Input() backgroundFill?: Fill;
  @Input() backgroundStroke?: Stroke;
  @Input() padding?: number[];

  public instance!: Text;

  constructor(protected styleHost: NolStyleComponent) { }

  update(): void {
    this.styleHost.update();
  }

  ngOnInit(): void {
    this.instance = new Text(this);
    this.styleHost.instance.setText(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;
    const { 
      backgroundFill, backgroundStroke,
      fill, font, justify, maxAngle, offsetX, offsetY, 
      overflow, padding, placement, rotateWithView, rotation, 
      scale, stroke, text, textAlign, textBaseline, 
    } = changes;
    if (backgroundFill) {
      this.instance.setBackgroundFill(backgroundFill.currentValue);
    }
    if (backgroundStroke) {
      this.instance.setBackgroundStroke(backgroundStroke.currentValue);
    }
    if (fill) {
      this.instance.setFill(fill.currentValue);
    }
    if (font) {
      this.instance.setFont(font.currentValue);
    }
    if (justify) {
      this.instance.setJustify(justify.currentValue);
    }
    if (maxAngle) {
      this.instance.setMaxAngle(maxAngle.currentValue);
    }
    if (offsetX) {
      this.instance.setOffsetX(offsetX.currentValue);
    }
    if (offsetY) {
      this.instance.setOffsetY(offsetY.currentValue);
    }
    if (overflow) {
      this.instance.setOverflow(overflow.currentValue);
    }
    if (padding) {
      this.instance.setPadding(padding.currentValue);
    }
    if (placement) {
      this.instance.setPlacement(placement.currentValue);
    }
    if (rotateWithView) {
      this.instance.setRotateWithView(rotateWithView.currentValue);
    }
    if (rotation) {
      this.instance.setRotation(rotation.currentValue);
    }
    if (scale) {
      this.instance.setScale(scale.currentValue);
    }
    if (stroke) {
      this.instance.setStroke(stroke.currentValue);
    }
    if (text) {
      this.instance.setText(text.currentValue);
    }
    if (textAlign) {
      this.instance.setTextAlign(textAlign.currentValue);
    }
    if (textBaseline) {
      this.instance.setTextBaseline(textBaseline.currentValue);
    }
    this.styleHost.update();
  }

  ngOnDestroy(): void {
    this.styleHost.instance.setText(undefined as any);
  }

}

import { 
  ChangeDetectionStrategy, 
  Component, 
  inject, 
  InjectOptions, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges 
} from '@angular/core';
import { Size } from 'ol/size';
import { Fill, Stroke } from 'ol/style';
import { DeclutterMode } from 'ol/style/Style';
import TextStyle, { Options, TextJustify, TextPlacement } from 'ol/style/Text';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useTextStyleHost } from './utils';

/**
 * The component that set text style for vector features.
 * @name nol-text-style
 * @order 1
 */
@Component({
  selector: 'nol-text-style',
  exportAs: 'nolTextStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTextStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolFont?: string;
  @Input() nolMaxAngle?: number;
  @Input() nolOffsetX?: number;
  @Input() nolOffsetY?: number;
  @Input() nolOverflow?: boolean;
  @Input() nolPlacement?: TextPlacement;
  @Input() nolRepeat?: number;
  @Input() nolScale?: number | Size;
  @Input() nolRotateWithView?: boolean;
  @Input() nolRotation?: number;
  @Input() nolText?: string | string[];
  @Input() nolTextAlign?: CanvasTextAlign;
  @Input() nolJustify?: TextJustify;
  @Input() nolTextBaseline?: CanvasTextBaseline;
  @Input() nolFill?: Fill | null;
  @Input() nolStroke?: Stroke;
  @Input() nolBackgroundFill?: Fill;
  @Input() nolBackgroundStroke?: Stroke;
  @Input() nolPadding?: number[];
  @Input() nolDeclutterMode?: DeclutterMode;

  private readonly host = useTextStyleHost();
  private instance!: TextStyle;

  getInstance() {
    return this.instance;
  }

  update(): void {
    this.host.setText(this.instance);
  }

  ngOnInit(): void {
    this.instance = new TextStyle({
      font: this.nolFont,
      maxAngle: this.nolMaxAngle,
      offsetX: this.nolOffsetX,
      offsetY: this.nolOffsetY,
      overflow: this.nolOverflow,
      placement: this.nolPlacement,
      repeat: this.nolRepeat,
      scale: this.nolScale,
      rotateWithView: this.nolRotateWithView,
      rotation: this.nolRotation,
      text: this.nolText,
      textAlign: this.nolTextAlign,
      justify: this.nolJustify,
      textBaseline: this.nolTextBaseline,
      fill: this.nolFill,
      stroke: this.nolStroke,
      backgroundFill: this.nolBackgroundFill,
      backgroundStroke: this.nolBackgroundStroke,
      padding: this.nolPadding,
      declutterMode: this.nolDeclutterMode,
    });

    this.host.setText(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }
    
    const {
      nolBackgroundFill,
      nolBackgroundStroke,
      nolFill,
      nolFont,
      nolJustify,
      nolMaxAngle,
      nolOffsetX,
      nolOffsetY,
      nolOverflow,
      nolPadding,
      nolPlacement,
      nolRepeat,
      nolRotateWithView,
      nolRotation,
      nolScale,
      nolStroke,
      nolText,
      nolTextAlign,
      nolTextBaseline,
    } = changes;

    if (nolBackgroundFill) {
      this.instance.setBackgroundFill(nolBackgroundFill.currentValue);
    }

    if (nolBackgroundStroke) {
      this.instance.setBackgroundStroke(nolBackgroundStroke.currentValue);
    }

    if (nolFill) {
      this.instance.setFill(nolFill.currentValue);
    }

    if (nolFont) {
      this.instance.setFont(nolFont.currentValue);
    }

    if (nolJustify) {
      this.instance.setJustify(nolJustify.currentValue);
    }

    if (nolMaxAngle) {
      this.instance.setMaxAngle(nolMaxAngle.currentValue);
    }

    if (nolOffsetX) {
      this.instance.setOffsetX(nolOffsetX.currentValue);
    }

    if (nolOffsetY) {
      this.instance.setOffsetY(nolOffsetY.currentValue);
    }

    if (nolOverflow) {
      this.instance.setOverflow(nolOverflow.currentValue);
    }

    if (nolPadding) {
      this.instance.setPadding(nolPadding.currentValue);
    }

    if (nolPlacement) {
      this.instance.setPlacement(nolPlacement.currentValue);
    }

    if (nolRepeat) {
      this.instance.setRepeat(nolRepeat.currentValue);
    }

    if (nolRotateWithView) {
      this.instance.setRotateWithView(nolRotateWithView.currentValue);
    }

    if (nolRotation) {
      this.instance.setRotation(nolRotation.currentValue);
    }

    if (nolScale) {
      this.instance.setScale(nolScale.currentValue);
    }

    if (nolStroke) {
      this.instance.setStroke(nolStroke.currentValue);
    }

    if (nolText) {
      this.instance.setText(nolText.currentValue);
    }

    if (nolTextAlign) {
      this.instance.setTextAlign(nolTextAlign.currentValue);
    }

    if (nolTextBaseline) {
      this.instance.setTextBaseline(nolTextBaseline.currentValue);
    }

    this.update();
  }

  ngOnDestroy(): void {
    this.host.setText(null);
  }

}

export function useTextStyle(): NolTextStyleComponent;
export function useTextStyle(options: InjectOptions & {optional?: false}): NolTextStyleComponent;
export function useTextStyle(options: InjectOptions): NolTextStyleComponent | null;
export function useTextStyle(options?: InjectOptions): NolTextStyleComponent | null  {
  return inject(NolTextStyleComponent, options || {}) || null;
}

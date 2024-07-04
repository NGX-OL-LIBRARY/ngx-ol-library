import { 
  ChangeDetectionStrategy, 
  Component, 
  InjectOptions, 
  Input, 
  OnChanges, 
  OnDestroy, 
  OnInit, 
  SimpleChanges, 
  inject 
} from '@angular/core';
import { Color } from 'ol/color';
import { ColorLike } from 'ol/colorlike';
import Stroke, { Options } from 'ol/style/Stroke';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useStrokeStyleHost } from './utils';

/**
 * The component that set stroke style for vector features.
 * @name nol-stroke-style
 * @order 1
 */
@Component({
  selector: 'nol-stroke-style',
  exportAs: 'nolStrokeStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolStrokeStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolColor?: Color | ColorLike;
  @Input() nolLineCap?: CanvasLineCap;
  @Input() nolLineJoin?: CanvasLineJoin;
  @Input() nolLineDash?: number[];
  @Input() nolLineDashOffset?: number;
  @Input() nolMiterLimit?: number;
  @Input() nolWidth?: number;

  private readonly host = useStrokeStyleHost();
  private instance!: Stroke;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Stroke({
      color: this.nolColor,
      lineCap: this.nolLineCap,
      lineDash: this.nolLineDash,
      lineDashOffset: this.nolLineDashOffset,
      lineJoin: this.nolLineJoin,
      miterLimit: this.nolMiterLimit,
      width: this.nolWidth,
    });

    this.host.setStroke(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const {
      nolColor,
      nolLineCap,
      nolLineJoin,
      nolLineDash,
      nolLineDashOffset,
      nolMiterLimit,
      nolWidth,
    } = changes;

    if (nolColor) {
      this.instance.setColor(nolColor.currentValue);
    }

    if (nolLineCap) {
      this.instance.setLineCap(nolLineCap.currentValue);
    }

    if (nolLineJoin) {
      this.instance.setLineJoin(nolLineJoin.currentValue);
    }

    if (nolLineDash) {
      this.instance.setLineDash(nolLineDash.currentValue);
    }

    if (nolLineDashOffset) {
      this.instance.setLineDashOffset(nolLineDashOffset.currentValue);
    }

    if (nolMiterLimit) {
      this.instance.setMiterLimit(nolMiterLimit.currentValue);
    }

    if (nolWidth) {
      this.instance.setWidth(nolWidth.currentValue);
    }

    this.host.update();
  }

  ngOnDestroy(): void {
    this.host.setStroke(null);
  }

}

export function useStrokeStyle(): NolStrokeStyleComponent;
export function useStrokeStyle(options: InjectOptions & {optional?: false}): NolStrokeStyleComponent;
export function useStrokeStyle(options: InjectOptions): NolStrokeStyleComponent | null;
export function useStrokeStyle(options?: InjectOptions): NolStrokeStyleComponent | null  {
  return inject(NolStrokeStyleComponent, options || {}) || null;
}

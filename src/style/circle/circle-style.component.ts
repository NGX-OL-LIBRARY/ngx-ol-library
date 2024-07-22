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
import CircleStyle, { Options } from 'ol/style/Circle';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useImageStyleHost } from 'ngx-ol-library/style/image';

/**
 * The component that set circle style for vector features.
 * @name nol-circle-style
 * @order 1
 */
@Component({
  selector: 'nol-circle-style',
  exportAs: 'nolCircleStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCircleStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolFill?: Fill;
  @Input() nolRadius!: number;
  @Input() nolStroke?: Stroke;
  @Input() nolDisplacement?: number[];
  @Input() nolScale?: number | Size;
  @Input() nolRotation?: number;
  @Input() nolRotateWithView?: boolean;
  @Input() nolDeclutterMode?: DeclutterMode;

  private readonly host = useImageStyleHost('nol-circle-style');
  private instance!: CircleStyle;

  getInstance() {
    return this.instance;
  }

  update(): void {
    this.host.setImage(this.instance);
  }

  ngOnInit(): void {
    this.instance = new CircleStyle({
      fill: this.nolFill,
      radius: this.nolRadius,
      stroke: this.nolStroke,
      displacement: this.nolDisplacement,
      scale: this.nolScale,
      rotation: this.nolRotation,
      rotateWithView: this.nolRotateWithView,
      declutterMode: this.nolDeclutterMode,
    });

    this.host.setImage(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const {
      nolDisplacement,
      nolFill,
      nolRadius,
      nolRotateWithView,
      nolRotation,
      nolScale,
      nolStroke,
    } = changes;

    if (nolDisplacement) {
      this.instance.setDisplacement(nolDisplacement.currentValue);
    }

    if (nolFill) {
      this.instance.setFill(nolFill.currentValue);
    }

    if (nolRadius) {
      this.instance.setRadius(nolRadius.currentValue);
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

    this.update();
  }

  ngOnDestroy(): void {
    this.host.setImage(null);
  }

}

export function useCircleStyle(): NolCircleStyleComponent;
export function useCircleStyle(options: InjectOptions & {optional?: false}): NolCircleStyleComponent;
export function useCircleStyle(options: InjectOptions): NolCircleStyleComponent | null;
export function useCircleStyle(options?: InjectOptions): NolCircleStyleComponent | null  {
  return inject(NolCircleStyleComponent, options || {}) || null;
}
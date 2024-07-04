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
import { Size } from 'ol/size';
import { Fill, Stroke } from 'ol/style';
import { DeclutterMode } from 'ol/style/Style';
import RegularShape, { Options } from 'ol/style/RegularShape';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useImageStyleHost } from 'ngx-ol-library/style/image';

/**
 * The component that set regular shape style for vector features.
 * @name nol-regular-shape-style
 * @order 1
 */
@Component({
  selector: 'nol-regular-shape-style',
  exportAs: 'nolRegularShapeStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRegularShapeStyleComponent 
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolFill?: Fill;
  @Input() nolPoints!: number;
  @Input() nolRadius!: number;
  @Input() nolRadius2?: number;
  @Input() nolAngle?: number;
  @Input() nolDisplacement?: number[];
  @Input() nolStroke?: Stroke;
  @Input() nolRotation?: number;
  @Input() nolRotateWithView?: boolean;
  @Input() nolScale?: number | Size;
  @Input() nolDeclutterMode?: DeclutterMode;

  private readonly host = useImageStyleHost('nol-regular-shape-style');
  private instance!: RegularShape;

  getInstance() {
    return this.instance;
  }

  update(): void {
    this.host.setImage(this.instance);
  }

  ngOnInit(): void {
    this.instance = new RegularShape({
      fill: this.nolFill,
      points: this.nolPoints,
      radius: this.nolRadius,
      radius2: this.nolRadius2,
      angle: this.nolAngle,
      displacement: this.nolDisplacement,
      stroke: this.nolStroke,
      rotation: this.nolRotation,
      rotateWithView: this.nolRotateWithView,
      scale: this.nolScale,
      declutterMode: this.nolDeclutterMode,
    });

    this.host.setImage(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const {
      nolFill,
      nolDisplacement,
      nolStroke,
      nolRotation,
      nolRotateWithView,
      nolScale,
    } = changes;

    if (nolFill) {
      this.instance.setFill(nolFill.currentValue);
    }

    if (nolDisplacement) {
      this.instance.setDisplacement(nolDisplacement.currentValue);
    }

    if (nolStroke) {
      this.instance.setStroke(nolStroke.currentValue);
    }

    if (nolRotation) {
      this.instance.setRotation(nolRotation.currentValue);
    }

    if (nolRotateWithView) {
      this.instance.setRotateWithView(nolRotateWithView.currentValue);
    }

    if (nolScale) {
      this.instance.setScale(nolScale.currentValue);
    }

    this.update();
  }

  ngOnDestroy(): void {
    this.host.setImage(null);    
  }

}

export function useRegularShapeStyle(): NolRegularShapeStyleComponent;
export function useRegularShapeStyle(options: InjectOptions & {optional?: false}): NolRegularShapeStyleComponent;
export function useRegularShapeStyle(options: InjectOptions): NolRegularShapeStyleComponent | null;
export function useRegularShapeStyle(options?: InjectOptions): NolRegularShapeStyleComponent | null  {
  return inject(NolRegularShapeStyleComponent, options || {}) || null;
}

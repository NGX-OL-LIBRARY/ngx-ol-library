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
import { Size } from 'ol/size.js';
import { DeclutterMode } from 'ol/style/Style';
import Icon, { IconAnchorUnits, IconOrigin, Options } from 'ol/style/Icon';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useImageStyleHost } from 'ngx-ol-library/style/image';

/**
 * The component that set icon style for vector features.
 * @name nol-icon-style
 * @order 1
 */
@Component({
  selector: 'nol-icon-style',
  exportAs: 'nolIconStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolIconStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolAnchor?: number[];
  @Input() nolAnchorOrigin?: IconOrigin;
  @Input() nolAnchorXUnits?: IconAnchorUnits;
  @Input() nolAnchorYUnits?: IconAnchorUnits;
  @Input() nolColor?: string | Color;
  @Input() nolCrossOrigin?: string | null;
  @Input() nolImg?: HTMLCanvasElement | HTMLImageElement | ImageBitmap;
  @Input() nolDisplacement?: number[];
  @Input() nolOpacity?: number;
  @Input() nolWidth?: number;
  @Input() nolHeight?: number;
  @Input() nolScale?: number | Size;
  @Input() nolRotateWithView?: boolean;
  @Input() nolRotation?: number;
  @Input() nolOffset?: number[];
  @Input() nolOffsetOrigin?: IconOrigin;
  @Input() nolSize?: Size;
  @Input() nolSrc?: string;
  @Input() nolDeclutterMode?: DeclutterMode;

  private readonly host = useImageStyleHost('nol-icon-style');
  private instance!: Icon;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Icon({
      anchor: this.nolAnchor,
      anchorOrigin: this.nolAnchorOrigin,
      anchorXUnits: this.nolAnchorXUnits,
      anchorYUnits: this.nolAnchorYUnits,
      color: this.nolColor,
      crossOrigin: this.nolCrossOrigin,
      img: this.nolImg,
      displacement: this.nolDisplacement,
      opacity: this.nolOpacity,
      width: this.nolWidth,
      height: this.nolHeight,
      scale: this.nolScale,
      rotateWithView: this.nolRotateWithView,
      rotation: this.nolRotation,
      offset: this.nolOffset,
      offsetOrigin: this.nolOffsetOrigin,
      size: this.nolSize,
      src: this.nolSrc,
      declutterMode: this.nolDeclutterMode,
    });

    this.host.setImage(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const {
      nolAnchor,
      nolDisplacement,
      nolOpacity,
      nolScale,
      nolRotateWithView,
      nolRotation,
    } = changes;

    if (nolAnchor) {
      this.instance.setAnchor(nolAnchor.currentValue);
    }

    if (nolDisplacement) {
      this.instance.setDisplacement(nolDisplacement.currentValue);
    }

    if (nolOpacity) {
      this.instance.setOpacity(nolOpacity.currentValue);
    }

    if (nolScale) {
      this.instance.setScale(nolScale.currentValue);
    }

    if (nolRotateWithView) {
      this.instance.setRotateWithView(nolRotateWithView.currentValue);
    }

    if (nolRotation) {
      this.instance.setRotation(nolRotation.currentValue);
    }

    this.host.update();
  }

  ngOnDestroy(): void {
    this.host.setImage(null);
  }

}

export function useIconStyle(): NolIconStyleComponent;
export function useIconStyle(options: InjectOptions & {optional?: false}): NolIconStyleComponent;
export function useIconStyle(options: InjectOptions): NolIconStyleComponent | null;
export function useIconStyle(options?: InjectOptions): NolIconStyleComponent | null  {
  return inject(NolIconStyleComponent, options || {}) || null;
}

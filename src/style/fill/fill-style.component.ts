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
import { Color } from 'ol/color.js';
import { ColorLike, PatternDescriptor } from 'ol/colorlike.js';
import Fill, { Options } from 'ol/style/Fill';
import { NolPrefixedOptions } from 'ngx-ol-library/core';
import { useFillStyleHost } from './utils';

/**
 * The component that set fill style for vector features.
 * @name nol-fill-style
 * @order 1
 */
@Component({
  selector: 'nol-fill-style',
  exportAs: 'nolFillStyle',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolFillStyleComponent
  implements NolPrefixedOptions<Options>, OnInit, OnChanges, OnDestroy {

  @Input() nolColor?: Color | ColorLike | PatternDescriptor | null;

  private readonly host = useFillStyleHost();
  private instance!: Fill;

  getInstance() {
    return this.instance;
  }

  ngOnInit(): void {
    this.instance = new Fill({
      color: this.nolColor,
    });

    this.host.setFill(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) {
      return;
    }

    const { nolColor } = changes;

    if (nolColor) {
      this.instance.setColor(nolColor.currentValue);
    }

    this.host.update();
  }

  ngOnDestroy(): void {
    this.host.setFill(null);
  }

}

export function useFillStyle(): NolFillStyleComponent;
export function useFillStyle(options: InjectOptions & {optional?: false}): NolFillStyleComponent;
export function useFillStyle(options: InjectOptions): NolFillStyleComponent | null;
export function useFillStyle(options?: InjectOptions): NolFillStyleComponent | null  {
  return inject(NolFillStyleComponent, options || {}) || null;
}

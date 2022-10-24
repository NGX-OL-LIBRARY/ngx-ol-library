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
import Fill from 'ol/style/Fill';
import RegularShape, { Options } from 'ol/style/RegularShape';
import Stroke from 'ol/style/Stroke';

@Component({
  selector: 'nol-regular-shape-style',
  exportAs: 'nolRegularShapeStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolRegularShapeStyleComponent<InstanceType extends RegularShape = RegularShape> extends NolImageStyleComponent<RegularShape>  implements OnInit, OnChanges, Options {

  @Input() fill?: Fill;
  @Input() points!: number;
  @Input() radius?: number;
  @Input() radius1?: number;
  @Input() radius2?: number;
  @Input() angle?: number;
  @Input() stroke?: Stroke;

  constructor(styleHost: NolStyleComponent) { 
    super(styleHost);
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new RegularShape(this);
    }
    super.ngOnInit();
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { fill, stroke, ...restChanges } = changes;
    if (this.instance && fill) {
      this.instance.setFill(fill.currentValue);
    }
    if (this.instance && stroke) {
      this.instance.setStroke(stroke.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

}

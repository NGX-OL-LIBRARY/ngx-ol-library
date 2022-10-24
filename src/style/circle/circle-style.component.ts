import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolRegularShapeStyleComponent } from 'ngx-ol-library/style/regular-shape';
import { NolStyleComponent } from 'ngx-ol-library/style/style';
import CircleStyle, { Options } from 'ol/style/Circle';

@Component({
  selector: 'nol-circle-style',
  exportAs: 'nolCircleStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolCircleStyleComponent extends NolRegularShapeStyleComponent<CircleStyle> implements OnInit, Options {

  @Input() override radius!: number;

  constructor(styleHost: NolStyleComponent) { 
    super(styleHost);
  }

  override ngOnInit(): void {
    this.instance = new CircleStyle(this);
    super.ngOnInit();
  }

}

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
import { NolStyleComponent } from 'ngx-ol-library/style/style';
import { Size } from 'ol/size';
import ImageStyle, { Options } from 'ol/style/Image';

@Component({
  selector: 'nol-image-style',
  exportAs: 'nolImageStyle',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolImageStyleComponent<InstanceType extends ImageStyle = ImageStyle> implements OnInit, OnChanges, OnDestroy, OnChanges, Options {

  @Input() opacity!: number;
  @Input() rotateWithView!: boolean;
  @Input() rotation!: number;
  @Input() scale!: number | Size;
  @Input() displacement!: Array<number>;
  @Input() declutterMode!: 'declutter' | 'obstacle' | 'none';

  public instance!: InstanceType;

  constructor(protected styleHost: NolStyleComponent) { }

  update(): void {
    this.styleHost.update();
  }

  ngOnInit(): void {
    if (!this.instance) {
      this.instance = new ImageStyle(this) as InstanceType;
    }
    this.styleHost.instance.setImage(this.instance);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.instance) return;

    const { displacement, opacity, rotateWithView, rotation, scale } = changes;
    if (displacement) {
      this.instance.setDisplacement(displacement.currentValue);
    }
    if (opacity) {
      this.instance.setOpacity(opacity.currentValue);
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
    this.styleHost.update();
  }

  ngOnDestroy(): void {
    this.styleHost.instance.setImage(undefined as any);
  }

}

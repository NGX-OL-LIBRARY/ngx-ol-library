import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interaction/interaction';
import Link, { Options } from 'ol/interaction/Link';
import { AnimationOptions } from 'ol/View';

@Component({
  selector: 'nol-link-interaction',
  exportAs: 'nolLinkInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolLinkInteractionComponent extends NolInteractionComponent<Link> implements OnInit, Options {

  @Input() animate?: boolean | AnimationOptions;
  @Input() replace?: boolean;
  @Input() prefix?: string;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Link(this);
    super.ngOnInit();
  }

}

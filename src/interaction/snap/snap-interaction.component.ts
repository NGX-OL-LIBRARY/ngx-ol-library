import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolPointerInteractionComponent } from 'ngx-ol-library/interaction/pointer';
import { Collection, Feature } from 'ol';
import { Geometry } from 'ol/geom';
import Snap, { Options } from 'ol/interaction/Snap';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'nol-snap-interaction',
  exportAs: 'nolSnapInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolSnapInteractionComponent extends NolPointerInteractionComponent<Snap> implements OnInit, Options {

  @Input() features?: Collection<Feature<Geometry>>;
  @Input() edge?: boolean;
  @Input() vertex?: boolean;
  @Input() pixelTolerance?: number;
  @Input() source?: VectorSource<Geometry>;

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new Snap(this);
    super.ngOnInit();
  }

}

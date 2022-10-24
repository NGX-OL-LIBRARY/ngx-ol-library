import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { NolMapComponent } from 'ngx-ol-library/map';
import { NolInteractionComponent } from 'ngx-ol-library/interaction/interaction';
import { MapBrowserEvent } from 'ol';
import PointerInteraction, { Options } from 'ol/interaction/Pointer';

@Component({
  selector: 'nol-pointer-interaction',
  exportAs: 'nolPointerInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolPointerInteractionComponent<InstanceType extends PointerInteraction = PointerInteraction> extends NolInteractionComponent<InstanceType> implements OnInit, Options {

  handleDownEvent?: ((event: MapBrowserEvent<any>) => boolean);
  handleDragEvent?: ((vent: MapBrowserEvent<any>) => void);
  handleEvent?: ((vent: MapBrowserEvent<any>) => boolean);
  handleMoveEvent?: ((vent: MapBrowserEvent<any>) => void);
  handleUpEvent?: ((vent: MapBrowserEvent<any>) => boolean);
  stopDown?: ((arg0: boolean) => boolean);

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new PointerInteraction(this) as InstanceType;
    super.ngOnInit();
  }

}

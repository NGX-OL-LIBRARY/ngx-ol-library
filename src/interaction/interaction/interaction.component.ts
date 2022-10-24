import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NolBaseObjectComponent } from 'ngx-ol-library/base-object';
import { NolMapComponent } from 'ngx-ol-library/map';
import Interaction from 'ol/interaction/Interaction';
import { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'nol-interaction',
  exportAs: 'nolInteraction',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolInteractionComponent<InstanceType extends Interaction = Interaction> extends NolBaseObjectComponent<InstanceType> implements OnInit, OnDestroy {

  @Input() active?: boolean;

  @Output() onActiveChange = new EventEmitter<ObjectEvent>();

  constructor(protected host: NolMapComponent) { 
    super();
  }

  override ngOnInit(): void {
    if (!this.instance) {
      this.instance = new Interaction() as InstanceType;
    }
    this.instance.on('change:active', (event: ObjectEvent) => this.onActiveChange.emit(event));
    super.ngOnInit();
    this.host.instance.addInteraction(this.instance);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { active, ...restChanges } = changes;
    if (this.instance && active) {
      this.instance.setActive(active.currentValue);
    }
    super.ngOnChanges(restChanges);
  }

  ngOnDestroy(): void {
    this.host.instance.removeInteraction(this.instance);
  }

}

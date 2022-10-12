import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  OnChanges, 
  OnInit, 
  Output, 
  SimpleChanges, 
  ViewEncapsulation 
} from '@angular/core';
import BaseEvent from 'ol/events/Event';
import BaseObject, { ObjectEvent } from 'ol/Object';

@Component({
  selector: 'nol-base-object',
  exportAs: 'nolBaseObject',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolBaseObjectComponent<InstanceType extends BaseObject = BaseObject> implements OnInit, OnChanges {

  public instance!: InstanceType;

  @Output() onChange = new EventEmitter<BaseEvent>();
  @Output() onError = new EventEmitter<BaseEvent>();
  @Output() onPropertyChange = new EventEmitter<ObjectEvent>();

  constructor() { }

  ngOnInit(): void {
    if (!this.instance) {
      this.instance = new BaseObject(this) as InstanceType;
    }
    this.instance.on('change', (event: BaseEvent) => this.onChange.emit(event));
    this.instance.on('error', (event: BaseEvent) => this.onError.emit(event));
    this.instance.on('propertychange', (event: ObjectEvent) => this.onPropertyChange.emit(event));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.instance) {
      const properties: Record<string, any> = changes['properties']?.currentValue || {};
      for (const key in changes) {
        if (Object.prototype.hasOwnProperty.call(changes, key)) {
          const value = changes[key].currentValue;
          properties[key] = value;
        }
      }
      this.instance.setProperties(properties);
    }
  }

}

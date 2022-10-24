import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NolControlComponent } from 'ngx-ol-library/control/control';
import { NolMapComponent } from 'ngx-ol-library/map';
import FullScreen, { Options } from 'ol/control/FullScreen';

@Component({
  selector: 'nol-full-screen-control',
  exportAs: 'nolFullScreenControl',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolFullScreenControlComponent extends NolControlComponent<FullScreen> implements OnInit, Options {

  @Input() className?: string;
  @Input() label?: string | HTMLElement | Text;
  @Input() labelActive?: string | HTMLElement | Text;
  @Input() activeClassName?: string;
  @Input() inactiveClassName?: string;
  @Input() tipLabel?: string;
  @Input() keys?: boolean;
  @Input() source?: string | HTMLElement;

  @Output() onEnterfullscreen = new EventEmitter<void>();
  @Output() onLeavefullscreen = new EventEmitter<void>();

  constructor(map: NolMapComponent) { 
    super(map);
  }

  override ngOnInit(): void {
    this.instance = new FullScreen(this);
    this.instance.on('enterfullscreen', () => this.onEnterfullscreen.emit());
    this.instance.on('leavefullscreen', () => this.onLeavefullscreen.emit());
    super.ngOnInit();
  }

}

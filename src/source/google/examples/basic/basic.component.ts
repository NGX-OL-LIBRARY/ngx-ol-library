import { NgIf } from '@angular/common';
import { 
  ChangeDetectionStrategy, 
  Component, 
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NolWebGLTileLayerModule } from 'ngx-ol-library/layer/webgl-tile';
import { NolMapModule } from 'ngx-ol-library/map';
import { NolGoogleSourceModule } from 'ngx-ol-library/source/google';
import { NolViewModule } from 'ngx-ol-library/view';
import BaseEvent from 'ol/events/Event';
import { NolGoogleLogoControlComponent } from './google-logo-controle.component';


@Component({
  selector: 'nol-google-source-basic-example',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSpaceModule,
    NzMessageModule,
    NolMapModule,
    NolViewModule,
    NolWebGLTileLayerModule,
    NolGoogleSourceModule,
    NolGoogleLogoControlComponent,
  ],
  template: `
    @if (showMap()) {
      <nol-map [nolHeight]="'400px'">
        <nol-view [nolCenter]="[0, 0]" [nolZoom]="2" />
        <nol-google-logo-control />
        <nol-webgl-tile-layer>
          <nol-google-source 
            [nolKey]="key"
            [nolScale]="'scaleFactor2x'"
            [nolHighDpi]="true"
            (nolChange)="onChange($event)"
          />
        </nol-webgl-tile-layer>
      </nol-map>
    }
    <dialog #dialog open>
      <form method="dialog" (submit)="showMap.set(true)">
        <nz-space>
          <span *nzSpaceItem>Your API key</span>
          <span *nzSpaceItem>
            <input type="password" name="key" nz-input [(ngModel)]="key">
          </span>
          <span *nzSpaceItem>
            <button type="submit" nz-button>show map</button>
          </span>
        </nz-space>
      </form>
    </dialog>
  `,
  styles: `
    :host {
      display: block;
      height: 400px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolGoogleSourceBasicExampleComponent {

  private readonly messageService = inject(NzMessageService);
  readonly showMap = signal(false);

  key = '';

  onChange(evt: BaseEvent): void {
    if (evt.target.getState() === 'error') {
      this.messageService.error(evt.target.getError());
    }
  }

}

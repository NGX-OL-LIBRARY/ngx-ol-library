import { 
  ChangeDetectionStrategy, 
  Component, 
  OnDestroy, 
  OnInit, 
  Renderer2, 
  inject
} from '@angular/core';
import { injectMap } from 'ngx-ol-library/map';
import { Control } from 'ol/control';

@Component({
  selector: 'nol-google-logo-control',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolGoogleLogoControlComponent implements OnInit, OnDestroy {

  private readonly renderer = inject(Renderer2);
  private readonly host = injectMap({ host: true });
  private instance!: Control;

  ngOnInit(): void {
    const element = document.createElement('img');
    const logoURL = 'https://developers.google.com/static/maps/documentation/images/google_on_white.png';

    this.renderer.setStyle(element, 'pointerEvents', 'none');
    this.renderer.setStyle(element, 'position', 'absolute');
    this.renderer.setStyle(element, 'bottom', '5px');
    this.renderer.setStyle(element, 'left', '5px');
    this.renderer.setProperty(element, 'src', logoURL);

    this.instance = new Control({ element });
    this.host.getInstance().addControl(this.instance);
  }

  ngOnDestroy(): void {
    this.host.getInstance().removeControl(this.instance);
  }
}
import { 
  ChangeDetectionStrategy, 
  Component, 
  inject, 
  InjectOptions
} from '@angular/core';
import { Fill } from 'ol/style';
import { useTextStyle } from './text-style.component';

@Component({
  selector: 'nol-text-background-fill',
  exportAs: 'nolTextBackgroundFill',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTextBackgroundFillComponent {

  private readonly host = useTextStyle({ host: true });

  constructor() {
    if (!this.host) {
      throw new Error(
        '`nol-text-background-fill` component must be nested within `nol-text-style` component.'
      );
    }
  }

  getInstance() {
    return {
      setFill: (fill: Fill | null) => {
        this.setBackgroundFill(fill);
      },
    };
  }

  update(): void {
    this.host.update();
  }

  private setBackgroundFill(fill: Fill | null): void {
    this.host.getInstance().setBackgroundFill(fill);
    this.update();
  }

}

export function useTextBackgroundFill(): NolTextBackgroundFillComponent;
export function useTextBackgroundFill(options: InjectOptions & {optional?: false}): NolTextBackgroundFillComponent;
export function useTextBackgroundFill(options: InjectOptions): NolTextBackgroundFillComponent | null;
export function useTextBackgroundFill(options?: InjectOptions): NolTextBackgroundFillComponent | null  {
  return inject(NolTextBackgroundFillComponent, options || {}) || null;
}

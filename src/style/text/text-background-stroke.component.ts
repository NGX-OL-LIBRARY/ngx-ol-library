import { 
  ChangeDetectionStrategy,
  Component, 
  inject, 
  InjectOptions 
} from '@angular/core';
import { Stroke } from 'ol/style';
import { useTextStyle } from './text-style.component';

@Component({
  selector: 'nol-text-background-stroke',
  exportAs: 'nolTextBackgroundStroke',
  standalone: true,
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NolTextBackgroundStrokeComponent {

  private readonly host = useTextStyle({ host: true });

  constructor() {
    if (!this.host) {
      throw new Error(
        '`nol-text-background-stroke` component must be nested within `nol-text-style` component.'
      );
    }
  }

  getInstance() {
    return {
      setStroke: (stroke: Stroke | null) => {
        this.setBackgroundStroke(stroke);
      },
    };
  }

  update(): void {
    this.host.update();
  }

  private setBackgroundStroke(stroke: Stroke | null): void {
    this.host.getInstance().setBackgroundStroke(stroke);
    this.update();
  }

}

export function useTextBackgroundStroke(): NolTextBackgroundStrokeComponent;
export function useTextBackgroundStroke(options: InjectOptions & {optional?: false}): NolTextBackgroundStrokeComponent;
export function useTextBackgroundStroke(options: InjectOptions): NolTextBackgroundStrokeComponent | null;
export function useTextBackgroundStroke(options?: InjectOptions): NolTextBackgroundStrokeComponent | null  {
  return inject(NolTextBackgroundStrokeComponent, options || {}) || null;
}

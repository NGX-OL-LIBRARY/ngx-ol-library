import { InjectOptions } from '@angular/core';
import { useRegularShapeStyle } from 'ngx-ol-library/style/regular-shape';
import { useStyle } from 'ngx-ol-library/style/style';
import { Stroke } from 'ol/style';

export function useStrokeStyleHost() {
  const injectOptions: InjectOptions = { host: true, optional: true };
  const host = useRegularShapeStyle() ||
    useStyle(injectOptions);

  if (!host) {
    throw new Error(
      '`nol-stroke-style` component must be nested within `nol-style`, `nol-regular-shape-style` component.'
    );
  }

  return {
    getInstance() {
      return host.getInstance();
    },
    update(): void {
      return host.update();
    },
    setStroke(stroke: Stroke | null): void {
      this.getInstance().setStroke(stroke);
      this.update();
    }
  };
}
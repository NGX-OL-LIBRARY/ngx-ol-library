import { InjectOptions } from '@angular/core';
import { useCircleStyle } from 'ngx-ol-library/style/circle';
import { useRegularShapeStyle } from 'ngx-ol-library/style/regular-shape';
import { useStyle } from 'ngx-ol-library/style/style';
import { useTextBackgroundFill, useTextStyle } from 'ngx-ol-library/style/text';
import { Fill } from 'ol/style';

export function useFillStyleHost() {
  const injectOptions: InjectOptions = { host: true, optional: true };
  const host = useTextBackgroundFill(injectOptions) || 
    useTextStyle(injectOptions) ||
    useCircleStyle(injectOptions) ||
    useRegularShapeStyle(injectOptions) ||
    useStyle(injectOptions);

  if (!host) {
    throw new Error(
      '`nol-fill-style` component must be nested within `nol-style`, ' +
      '`nol-regular-shape-style` or `nol-circle-style` component.'
    );
  }

  return {
    getInstance() {
      return host.getInstance();
    },
    update(): void {
      return host.update();
    },
    setFill(fill: Fill | null): void {
      this.getInstance().setFill(fill);
      this.update();
    }
  };
}
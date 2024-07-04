import { useStyle } from 'ngx-ol-library/style/style';
import ImageStyle from 'ol/style/Image';

export function useImageStyleHost(selector: string) {
  const host = useStyle({ host: true, optional: true });

  if (!host) {
    throw new Error(
      '`' + selector + '` component must be nested within `nol-style` component.'
    );
  }

  return {
    getInstance() {
      return host.getInstance();
    },
    update(): void {
      host.update();
    },
    setImage(image: ImageStyle | null): void {
      this.getInstance().setImage(image as ImageStyle);
      this.update();
    }
  };

}
import { useStyle } from 'ngx-ol-library/style/style';
import TextStyle from 'ol/style/Text';

export function useTextStyleHost() {
  const host = useStyle({ host: true, optional: true });

  if (!host) {
    throw new Error(
      '`nol-text-style` component must be nested within `nol-style` component.'
    );
  }

  return {
    getInstance() {
      return host.getInstance();
    },
    update(): void {
      host.update();
    },
    setText(text: TextStyle | null): void {
      this.getInstance().setText(text as TextStyle);
      this.update();
    }
  };

}
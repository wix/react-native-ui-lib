
import {ColorValue} from './colors';

interface Theme {
  primaryColor: ColorValue;
  CTA: {
    textColor: ColorValue;
    disabledColor: ColorValue;
    backgroundColor: ColorValue;
  };
  titleColor: ColorValue;
  subtitleColor: ColorValue;
  dividerColor: ColorValue;
  components: {
    TouchableOpacity: {
      throttleTime: number;
      throttleOptions: {
        leading: boolean;
        trailing: boolean;
      };
    };
  };
}

export declare class ThemeManagerClass {
  setTheme(overrides: Partial<Theme>): void;
  getTheme(): Theme;

  setItem(key: string, value: any): void;
  getItem(key: string): any;

  setComponentTheme(componentName: string, overrides: () => object | object ): void;

  readonly components: { [key: string]: any };
  readonly primaryColor: ColorValue;
  readonly CTATextColor: ColorValue;
  readonly CTADisabledColor: ColorValue;
  readonly CTABackgroundColor: ColorValue;
  readonly titleColor: ColorValue;
  readonly subtitleColor: ColorValue;
  readonly dividerColor: ColorValue;
}

export const ThemeManager: ThemeManagerClass;

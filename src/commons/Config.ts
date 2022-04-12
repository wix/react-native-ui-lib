import {SchemeType} from '../style';
interface ConfigOptions {
  /**
   * Should use platform colors for design tokens
   */
  usePlatformColors?: boolean;
  /**
   * The app's colors scheme (default | light | dark)
   */
  appScheme?: SchemeType;
}

class Config {
  usePlatformColors?: boolean;
  appScheme: SchemeType = 'light';

  constructor() {
    this.setConfig({});
  }

  public setConfig(options: ConfigOptions) {
    const {usePlatformColors = false, appScheme = 'light'} = options;
    this.usePlatformColors = usePlatformColors;
    this.appScheme = appScheme;
  }
}

export default new Config();

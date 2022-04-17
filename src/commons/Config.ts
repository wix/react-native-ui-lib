interface ConfigOptions {
  /**
   * Should use platform colors for design tokens
   */
  usePlatformColors?: boolean;
}

class Config {
  usePlatformColors?: boolean;

  constructor() {
    this.setConfig({});
  }

  public setConfig(options: ConfigOptions) {
    const {usePlatformColors = false} = options;
    this.usePlatformColors = usePlatformColors;
  }
}

export default new Config();

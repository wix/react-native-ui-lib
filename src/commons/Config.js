class Config {
  appScheme = 'light';
  constructor() {
    this.setConfig({});
  }
  async setConfig(options) {
    const {
      usePlatformColors = false,
      appScheme = 'light'
    } = options;
    this.usePlatformColors = usePlatformColors;
    this.appScheme = appScheme;
  }
}
export default new Config();
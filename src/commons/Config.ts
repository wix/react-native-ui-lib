import {SchemeType} from '../style';
import {AsyncStoragePackage} from 'optionalDeps';

const isAsyncStorageInstalled = !!AsyncStoragePackage;

interface ConfigOptions {
  /**
   * Should use platform colors for design tokens
   */
  usePlatformColors?: boolean;
  /**
   * Whether to scheme from local storage
   */
  useLocalScheme?: boolean;
  /**
   * The app's colors scheme (default | light | dark)
   */
  appScheme?: SchemeType;
}

class Config {
  usePlatformColors?: boolean;
  useLocalScheme?: boolean;
  appScheme: SchemeType = 'light';

  constructor() {
    this.setConfig({});
  }

  public async setConfig(options: ConfigOptions) {
    const {usePlatformColors = false, appScheme = 'light', useLocalScheme = false} = options;
    this.usePlatformColors = usePlatformColors;
    if (isAsyncStorageInstalled && useLocalScheme) {
      this.appScheme = await AsyncStoragePackage.getItem?.('rnuilib.appScheme') || appScheme;
    } else {
      this.appScheme = appScheme;
    }
  }

  public async setLocalScheme(scheme: SchemeType) { 
    if (isAsyncStorageInstalled) {
      await AsyncStoragePackage.setItem?.('rnuilib.appScheme', scheme);
    } else {
      console.error('RNUILib requires installing "@react-native-community/async-storage" dependency to use setLocalScheme');
    }
  }
}

export default new Config();

import {SchemeType} from '../style';
import {AsyncStoragePackage} from 'optionalDeps';

const isAsyncStorageInstalled = !!AsyncStoragePackage;
const validateAsyncStorage = (method: 'get' | 'set') => {
  if (isAsyncStorageInstalled) {
    return true;
  } else {
    console.error(`RNUILib requires installing "@react-native-community/async-storage" dependency to use ${method}LocalScheme`);
    return false;
  }
};

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
      this.appScheme = (await this.getLocalScheme?.()) || appScheme;
    } else {
      this.appScheme = appScheme;
    }
  }

  public async setLocalScheme(scheme: SchemeType) {
    if (validateAsyncStorage('set')) {
      await AsyncStoragePackage.setItem?.('rnuilib.appScheme', scheme);
    }
  }

  public async getLocalScheme() {
    if (validateAsyncStorage('get')) {
      return await AsyncStoragePackage.getItem?.('rnuilib.appScheme');
    }
  }
}

export default new Config();
